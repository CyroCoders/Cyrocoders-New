import Retica, jwt
import Retica.Render

server = Retica.Server(__name__)
templator = Retica.Render.TemplateRender(server)

@server.create_endpoint("/")
def index(request: Retica.Request.request, response: Retica.Response.response):
    response.body = templator.render("index.jinja")

@server.create_endpoint("/profile")
def index(request: Retica.Request.request, response: Retica.Response.response):
    response.body = templator.render("profile.jinja")

@server.create_endpoint("/course")
def index(request: Retica.Request.request, response: Retica.Response.response):
    response.body = templator.render("course.jinja")