from django.urls import path     
from . import views

urlpatterns = [
    path('', views.index),
    path('home', views.home_page, name='homepage'),
    path('collections/All/products',views.view_all_sauces),
    path('collections/featured/products/<str:name>',views.featured_sauce),
    path('collections/<str:heat>/products',views.view_sauces_by_heat),
    path('collections/<str:heat>/products/<int:id>',views.view_sauce,name='view_sauce'),
    path('page-not-found',views.page_not_found),
    path('clear',views.clear),
    path('add-to-cart',views.add_to_cart),
    path('checkout',views.checkout),
    path('checkout/remove-sauce/<int:id>',views.remove_sauce,name='remove_sauce'),
    path('checkout/complete',views.checkout_complete)
]