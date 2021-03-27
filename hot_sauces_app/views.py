from django.shortcuts import render, redirect
from django.urls import path
from . import views      
from .models import HotSauce
from django.core import serializers
import random
import string
import json

def index(request):
    return redirect("/home")

def home_page(request):
    context = { "month_sauce" : HotSauce.objects.get(name="The Last Dab | APOLLO"),
                "sauces" : HotSauce.objects.all()
            }
    return render(request,"homepage.html",context)

def view_sauce(request,heat,id):
    sauce = HotSauce.objects.filter(id=id)
    if(sauce.count() == 0):
        return redirect("/page-not-found")
    if(sauce[0].spice != heat):
        return redirect("/page-not-found")
    context = {}
    context["sauce"] = HotSauce.objects.get(id=id)
    related_ids = related_products(id,75)
    related_sauces = []
    for i in range(4):
        related_sauces.append(HotSauce.objects.get(id=related_ids[i]))
    context["related_sauces"] = related_sauces
    return render(request,"view-sauce.html",context)

def view_all_sauces(request):
    context = {}
    all_sauces = HotSauce.objects.all()
    sauces_serialized = serializers.serialize('json', all_sauces)
    context['sauces'] = sauces_serialized
    context['heat_title'] = 'All'
    return render(request,"all-products.html",context)

def view_sauces_by_heat(request,heat):
    if(heat == "Hottest" or heat == "Hot" or heat == "Medium" or heat == "Mild"):
        context = {}
        all_sauces = HotSauce.objects.filter(spice=heat)
        sauces_serialized = serializers.serialize('json', all_sauces)
        context['sauces'] = sauces_serialized
        context['heat_title'] = heat
        return render(request,"heat-products.html",context)
    else:
        return redirect("/page-not-found")

def featured_sauce(request,name):
    if(name == "BurnAbility" or name == "keith" or name == "grange"):
        context = {}
        context['featured'] = HotSauce.objects.filter(name__contains=name)
        random_ids = random.sample(range(3,73),4)
        related_sauces = []
        for i in range(4):
            related_sauces.append(HotSauce.objects.get(id=random_ids[i]))
        context["related_sauces"] = related_sauces 
        return render(request,"featured-sauce.html",context)
    else:
        return redirect("/page-not-found")

def checkout(request):
    cart = []
    context = {}
    total = 0
    for key, value in request.session.items():
        sauce = HotSauce.objects.get(id=key)
        cart.append([sauce,value,sauce.price*value])
    if len(cart) == 0:
        context['empty'] = 'True'
    else:
        context['empty'] = 'False'
        for item in cart:
            total += item[0].price * item[1]

    context['cart'] = cart
    context['total'] = total
    return render(request,"checkout.html",context)

def checkout_complete(request): 
    request.session.clear()
    context = {}
    context['order'] = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
    return render(request,"checkout-complete.html",context)

def remove_sauce(request,id):
    str_id = str(id)
    del request.session[str_id]
    return redirect("/checkout")

def page_not_found(request):
    return render(request,"page-not-found.html")

def add_to_cart(request):
    id = str(request.POST['sauce-id'])
    heat = request.POST['sauce-heat']
    amount = int(request.POST['sauce-amount'])
    url = "collections/" + heat + "/products/" + id
    if id in request.session:
        request.session[id] += amount
    else:
        request.session[id] = amount
    return redirect(url)

def related_products(id,max):
    products = []
    products.append(id-2) if(id-2 > 1) else products.append(id+3)
    products.append(id-1) if(id-1 > 1) else products.append(id+4)
    products.append(id+1) if(id+1 <= max) else products.append(id-4)
    products.append(id+2) if(id+2 <= max) else products.append(id-3)
    return products

def clear(request):
    request.session.clear()
    return redirect("/")

# def new_sauce(request):
#     HotSauce.objects.create(name = request.POST['name'],spice = request.POST['spice'],
#                             price = request.POST['price'],description = request.POST['description'],
#                             ingredients = request.POST['ingredients'],image_name = request.POST['image-name'])
#     print(request.POST['name'],request.POST['spice'],request.POST['price'],request.POST['description'],request.POST['ingredients'],request.POST['image-name'])
#     return redirect("/")






