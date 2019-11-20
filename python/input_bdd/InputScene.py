import csv
import sqlite3
conn = sqlite3.connect('BddSono3D.db') #TO DO
c = conn.cursor()
with open('InputScene.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    ArraySon =[]
    for row in csv_reader:
        ArraySon.append(row)

for i in range(len(ArraySon)-2):
    nom = ArraySon[i+2][0]
    first_mesh = ArraySon[i+2][1]

    li=(nom,first_mesh)
    c.execute("INSERT INTO Scene(nom,first_mesh_nom) VALUES (?,?)",li)
    conn.commit()
c.execute("SELECT * FROM Scene")
row = c.fetchone()
while row != None:
    print(row)
    row = c.fetchone()
conn.close()