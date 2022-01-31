from asyncio import ensure_future
import json
from tkinter import getboolean
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db import IntegrityError
from django.http import Http404, HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import get_list_or_404, redirect, render, get_object_or_404
from django.urls import reverse

from .models import User, Post


def index(request):
    if request.method == "POST":
        content = request.POST['post']
        Post.objects.create(author=request.user, content=content)
        return redirect('index')
    else:
        posts = Post.objects.all()
        return render(request, "network/index.html", {
            "posts": posts,
        })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


@ensure_csrf_cookie
def likes_management(request, post_id):
    # Query for requested post
    try:
        post = Post.objects.get(pk=post_id)
    except Post.DoesNotExist:
        return JsonResponse({"error": "Post not found"}, status=404)

    if request.method == "PUT":
        data = json.loads(request.body)
        if data.get("liked"):
            post.likes.add(request.user)  
        else:
            post.likes.remove(request.user)
        post.save()
        return JsonResponse(post.serialize())

# @ensure_csrf_cookie
# def follow_management(request, adsf):
#     pass


def profile(request, user_id):
    try:
        profile = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        raise Http404("This user does not exist")
    
    return render(request, 'network/profile.html', {
        'profile': profile,
    })