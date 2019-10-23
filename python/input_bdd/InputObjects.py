import csv
import sqlite3
conn = sqlite3.connect('PRI_sprint1.db')
c = conn.cursor()
with open('InputObjects.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    ArraySon =[]
    for row in csv_reader:
        ArraySon.append(row)

for i in range(len(ArraySon)-2):
    name = ArraySon[i+2][0]
    typeObj = ArraySon[i+2][1]
    attached_sound =ArraySon[i+2][2]
    attached_sound_clic = ArraySon[i+2][3]
    attached_sound_look = ArraySon[i+2][4]
    params = ArraySon[i+2][5]
    mot_cle = ArraySon[i+2][6]
    
    li=(name,typeObj,attached_sound,attached_sound_clic,attached_sound_look,params,mot_cle)
    c.execute("INSERT INTO objects(name,type,attached_sound,attached_sound_clic,attached_sound_look,params,mot_cle) VALUES (?,?,?,?,?,?,?)",li)
    conn.commit()
c.execute("SELECT * FROM objects")
row = c.fetchone()
while row != None:
    print(row)
    row = c.fetchone()
conn.close()