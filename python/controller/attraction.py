import request.request as req

def add_attraction(data):
    print(data, flush=True)
    if (not "nom" in data or data["nom"] == ""):
        return False
    
    if (not "description" in data or data["description"] == ""):
        return False

    if (not "difficulte" in data or data["difficulte"] is None):
        return False

    if (not "visible" in data):
        data["visible"] = True

    if ("attraction_id" in data and data["attraction_id"]):
      requete = f"UPDATE attraction SET nom='{data['nom']}', description='{data['description']}', difficulte={data['difficulte']}, visible={data['visible']} WHERE attraction_id = {data['attraction_id']}"
      req.insert_in_db(requete)
      id = data['attraction_id']
    else:
      requete = "INSERT INTO attraction (nom, description, difficulte, visible) VALUES (?, ?, ?, ?);"
      id = req.insert_in_db(requete, (data["nom"], data["description"], data["difficulte"], data["visible"]))

    return id

def get_all_attraction():
    json = req.select_from_db("SELECT * FROM attraction")
    
    return json

def get_all_visible_attraction():
    json = req.select_from_db("SELECT * FROM attraction WHERE visible = true")
    
    return json

def get_attraction(id):
    if (not id):
        return False

    json = req.select_from_db("SELECT * FROM attraction WHERE attraction_id = ?", (id,))

    if len(json) > 0:
        return json[0]
    else:
        return []
    
def get_critiques(id):
    if (not id):
        return False

    json = req.select_from_db("SELECT * FROM critique WHERE attraction_id = ?", (id,))

    return json

def delete_attraction(id):
    if (not id):
        return False

    req.delete_from_db("DELETE FROM attraction WHERE attraction_id = ?", (id,))

    return True

def add_critique(data):
    print(data, flush=True)
    if (not "rating" in data or data["rating"] == ""):
        return False

    if (not "attraction_id" in data or data["attraction_id"] is None):
        return False

    if ("critique_id" in data and data["critique_id"]):
      requete = f"UPDATE critique SET name='{data['name']}', text='{data['text']}', rating={data['rating']}, attraction_id={data['attraction_id']} WHERE critique_id = {data['critique_id']}"
      req.insert_in_db(requete)
      id = data['critique_id']
    else:
      requete = "INSERT INTO critique (name, text, rating, attraction_id) VALUES (?, ?, ?, ?);"
      id = req.insert_in_db(requete, (data["name"], data["text"], data["rating"], data["attraction_id"]))

    return id

def delete_critique(id):
    if (not id):
        return False

    req.delete_from_db("DELETE FROM critique WHERE critique_id = ?", (id,))

    return True