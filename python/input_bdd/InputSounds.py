import csv
import sqlite3
conn = sqlite3.connect('PRI_sprint1.db')
c = conn.cursor()
with open('InputSounds.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    ArraySon =[]
    for row in csv_reader:
        ArraySon.append(row)

for i in range(len(ArraySon)-2):
    name = ArraySon[i+2][0]
    uri = ArraySon[i+2][1]
    params =ArraySon[i+2][2]
    mot_cle = ArraySon[i+2][3]
    
    li=(name,uri,params,mot_cle)
    c.execute("INSERT INTO sounds(name,uri,params,mot_cle) VALUES (?,?,?,?)",li)
    conn.commit()
c.execute("SELECT * FROM sounds")
row = c.fetchone()
while row != None:
    print(row)
    row = c.fetchone()
conn.close()