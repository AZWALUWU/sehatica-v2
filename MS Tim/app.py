### ----------------------------- ###
###           libraries           ###
### ----------------------------- ###

import gradio as gr
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn import metrics


### ------------------------------ ###
###       data transformation      ###
### ------------------------------ ###

# load dataset
uncleaned_data = pd.read_csv('dataset_penyakit_10000_cleaned (1).csv')

# remove timestamp from dataset (if applicable)
# uncleaned_data = uncleaned_data.iloc[:, 1:]  # Uncomment if you need to remove the first column
data = pd.DataFrame()

# keep track of which columns are categorical and what 
# those columns' value mappings are
# structure: {colname1: {...}, colname2: {...} }
cat_value_dicts = {}
final_colname = uncleaned_data.columns[len(uncleaned_data.columns) - 1]

# for each column...
for (colname, colval) in uncleaned_data.iteritems():

  # check if col is already a number; if so, add col directly
  # to new dataframe and skip to next column
  if isinstance(colval.values[0], (np.integer, float)):
    data[colname] = uncleaned_data[colname].copy()
    continue

  # structure: {0: "lilac", 1: "blue", ...}
  new_dict = {}
  val = 0 # first index per column
  transformed_col_vals = [] # new numeric datapoints

  # if not, for each item in that column...
  for (row, item) in enumerate(colval.values):
    
    # if item is not in this col's dict...
    if item not in new_dict:
      new_dict[item] = val
      val += 1
    
    # then add numerical value to transformed dataframe
    transformed_col_vals.append(new_dict[item])
  
  # reverse dictionary only for final col (0, 1) => (vals)
  if colname == final_colname:
    new_dict = {value : key for (key, value) in new_dict.items()}

  cat_value_dicts[colname] = new_dict
  data[colname] = transformed_col_vals


### -------------------------------- ###
###           model training         ###
### -------------------------------- ###

# select features and predicton; automatically selects last column as prediction
cols = len(data.columns)
num_features = cols - 1
x = data.iloc[: , :num_features]
y = data.iloc[: , num_features:]

# split data into training and testing sets
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.25)

# instantiate the model (using default parameters)
model = LogisticRegression()
model.fit(x_train, y_train.values.ravel())
y_pred = model.predict(x_test)


### -------------------------------- ###
###        article generation        ###
### -------------------------------- ###
# borrow file reading function from reader.py

def get_feat():
  feats = [abs(x) for x in model.coef_[0]]
  max_val = max(feats)
  idx = feats.index(max_val)
  return data.columns[idx]
  
acc = str(round(metrics.accuracy_score(y_test, y_pred) * 100, 1)) + "%"
most_imp_feat = get_feat()
# info = get_article(acc, most_imp_feat)



### ------------------------------- ###
###        interface creation       ###
### ------------------------------- ###


# predictor for generic number of features
def general_predictor(*args):
  features = []

  # transform categorical input
  for colname, arg in zip(data.columns, args):
    if (colname in cat_value_dicts):
      features.append(cat_value_dicts[colname][arg])
    else:
      features.append(arg)

  # predict single datapoint
  new_input = [features]
  result = model.predict(new_input)
  return cat_value_dicts[final_colname][result[0]]

# add data labels to replace those lost via star-args


block = gr.Blocks()

with open('info.md') as f:
  with block:
    gr.Markdown(f.readline())
    gr.Markdown('Take the quiz to get a personalized recommendation using AI.')
    
    with gr.Row():
      with gr.Box():
        inputls = []
        for colname in data.columns:
          # skip last column
          if colname == final_colname:
            continue
          
          # access categories dict if data is categorical
          # otherwise, just use a number input
          if colname in cat_value_dicts:
            radio_options = list(cat_value_dicts[colname].keys())
            inputls.append(gr.inputs.Dropdown(choices=radio_options, type="value", label=colname))
          else:
            # add numerical input
            inputls.append(gr.inputs.Number(label=colname))
          gr.Markdown("<br />")
        
        submit = gr.Button("Click to see your personalized result!", variant="primary")
        gr.Markdown("<br />")
        output = gr.Textbox(label="Your recommendation:", placeholder="your recommendation will appear here")
        
        submit.click(fn=general_predictor, inputs=inputls, outputs=output)
        gr.Markdown("<br />")
        
        with gr.Row():
          with gr.Box():
            gr.Markdown(f"<h3>Accuracy: </h3>{acc}")
          with gr.Box():
            gr.Markdown(f"<h3>Most important feature: </h3>{most_imp_feat}")
        
        gr.Markdown("<br />")
        
        with gr.Box():
          gr.Markdown('''⭐ Note that model accuracy is based on the uploaded data.csv and reflects how well the AI model can give correct recommendations for <em>that dataset</em>. Model accuracy and most important feature can be helpful for understanding how the model works, but <em>should not be considered absolute facts about the real world</em>.''')
        
      with gr.Box():
        with open('info.md') as f:
          f.readline()
          gr.Markdown(f.read())

# show the interface
block.launch()