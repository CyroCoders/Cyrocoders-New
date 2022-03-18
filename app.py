import CyroWebB, jwt

server = CyroWebB.Server(__name__)
template = CyroWebB.Template(server)

@server.create_endpoint("/")
def index(request: CyroWebB.Request.request, response: CyroWebB.Response.response):
    response.text = template("index.jinja")

@server.create_endpoint("/profile")
def index(request: CyroWebB.Request.request, response: CyroWebB.Response.response):
    response.text = template("profile.jinja")