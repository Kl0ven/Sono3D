import csv
import sqlite3
conn = sqlite3.connect('BddSono3D.db') #TO DO
c = conn.cursor()
with open('InputSeq.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    ArraySon =[]
    for row in csv_reader:
        ArraySon.append(row)

for i in range(len(ArraySon)-3):
    t0 = ArraySon[i+2][0]
    eps = ArraySon[i+2][1]
    nom_son =ArraySon[i+2][2]
    nom = ArraySon[i+2][3]
    if (len(ArraySon[i+3][0])=='0'):
        next_id = None
    elif (len(ArraySon[i+2][0])==0):
        next_id = None
    else:
        next_id=i+2
    loop = ArraySon[i+2][4]

    li=(t0,eps,nom_son,nom,next_id,loop)
    c.execute("INSERT INTO Sequenceur(t0,eps,nom_son,nom,next_id,loop) VALUES (?,?,?,?,?,?)",li)
    conn.commit()
c.execute("SELECT * FROM Sequenceur")
row = c.fetchone()
while row != None:
    print(row)
    row = c.fetchone()
conn.close()