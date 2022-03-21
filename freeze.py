from app import server
import CyroWebB
import os

if not(os.path.isdir("static_site")):
    os.mkdir("static_site")

tasks = []

for endpoint in server.endpoints.keys():
    if os.path.splitext(endpoint)[1] not in ['', '.']:
        file_name = endpoint.split("/")[-1] if endpoint[-1] != "/" else endpoint[:-1].split("/")[-1]
        folder = os.path.splitext(endpoint)[0]
    elif os.path.splitext(endpoint[:-1])[1] not in ['', '.']:
        file_name = endpoint.split("/")[-1] if endpoint[-1] != "/" else endpoint[:-1].split("/")[-1]
        folder = os.path.splitext(endpoint[:-1])[0]
    else:
        file_name = "index.html"
        if endpoint[-1] == "/":
            folder = os.path.splitext(endpoint[:-1])[0]
        else:
            folder = os.path.splitext(endpoint)[0]
    endpoint = "."*3 + endpoint + "."*3
    folder = "."*3 + folder + "."*3
    if endpoint[-3] == "/":
        endpoint = endpoint[:-1]
    if endpoint[3] == "/":
        endpoint = endpoint[1:]
    if folder[-3] == "/":
        folder = folder[:-1]
    if folder[3] == "/":
        folder = folder[1:]
    endpoint = endpoint[3:-3]
    folder = folder[3:-3]
    tasks.append((endpoint, file_name, folder))

for endpoint, file_name, folder in tasks:
    for folder_ in range(len(folder.split("/"))):
        if not os.path.isdir("static_site/" + "/".join(folder.split("/")[:folder_+1])):
            os.mkdir("static_site/" + "/".join(folder.split("/")[:folder_+1]))
    with open("static_site/" + (f"{folder}/{file_name}" if folder not in [''] else f"/{file_name}"), "w") as f:
        print(f"Generating static page \"{file_name}\" at '{folder}' for endpoint: {endpoint}")
        response = CyroWebB.Response.response()
        request = CyroWebB.Request.request(f'GET { "/" + f"{folder}/{file_name}" if folder not in [""] else f"/{file_name}" } HTTP/1.1\nUser-Agent: CyroWeb-Freezer\nAccept-Encoding: gzip, deflate\nConnection: Keep-Alive'.encode())
        server.endpoints['/' + endpoint](request, response)
        f.write(response.text)
        print(f.name)

def copyFolder(_from,to):
    print(f"Copying folder {_from} to {to}")
    for file_name in os.listdir(_from):
        if not os.path.isdir(to):
            os.mkdir(to)
        from_ = _from + file_name
        to_ = to + file_name
        print(from_)
        if os.path.isfile(from_):
            with open (to_, "wb") as f:
                f.write(open(from_, "rb").read())
        else:
            copyFolder(from_+"/", to_+"/")

copyFolder("static/", "static_site/")