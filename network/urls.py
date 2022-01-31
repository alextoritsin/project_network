
from django.urls import path, re_path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("profile/<int:user_id>", views.profile, name="profile"),

    # API routes
    re_path(r".*likes/(?P<post_id>[0-9]*)", views.likes_management, name='likes'),
    # path("likes/<int:post_id>", views.likes_management, name='likes'),
]
