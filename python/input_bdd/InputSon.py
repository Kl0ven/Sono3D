import csv
import sqlite3
conn = sqlite3.connect('BddSono3D.db')
c = conn.cursor()
with open('InputSon.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    ArraySon =[]
    for row in csv_reader:
        ArraySon.append(row)

for i in range(len(ArraySon)-2):
    nom = ArraySon[i+2][0]
    uri = ArraySon[i+2][1]
    duree = ArraySon[i+2][2]
    date = ArraySon[i+2][3]
    volume = ArraySon[i+2][4]
    spatial = ArraySon[i+2][5]
    
    li=(nom,uri,duree,date,volume,spatial)
    c.execute("INSERT INTO Son(nom,uri,duree,date,volume,spatial) VALUES (?,?,?,?,?,?)",li)
    conn.commit()
c.execute("SELECT * FROM Son")
row = c.fetchone()
while row != None:
    print(row)
    row = c.fetchone()
conn.close()