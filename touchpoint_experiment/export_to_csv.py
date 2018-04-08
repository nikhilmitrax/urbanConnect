# read JSONL file and export to CSV

import json
import csv
data = map(json.loads, open('dataset.jsonl','r').readlines())


with open('dataset.csv','wb') as csvfile:
    fieldnames = data[0].keys()
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for row in data:
        writer.writerow(row)
