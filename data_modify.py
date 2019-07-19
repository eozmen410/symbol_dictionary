import os
import json
import json
import urllib
import time
from os import listdir
from os.path import isfile, join
import uuid

#gets rid of images marked "deleted"
def clean_data():
    path_data = './all_data.js'
    if os.path.isfile(path_data):
        with open(path_data, 'r+') as f:
            data = f.read()
            data = data[15:] #get rid of "var all_data=""
            dict_json = json.loads(data)
            for x in dict_json:
                # print dict_json[x]
                dict_json[x]['id'] = x #add id variable
                for symbol in dict_json[x]['symbols']:
                    if symbol['deleted'] == "True":
                        dict_json[x]['symbols'].remove(symbol)
                        print 'removing!'
            new_js_file = './modified_all_data.js'
            with open(new_js_file, 'w') as outfile:
                outfile.write("var all_data =")
                json.dump(dict_json, outfile)
            print 'success!'

                        


if __name__ == "__main__":
    clean_data()
