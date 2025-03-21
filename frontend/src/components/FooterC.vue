<template>
  <footer class="bg-gray-800 text-white py-12">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-4 gap-8">
            <div>
              <div class="flex items-center mb-4">
                <MapPin class="h-6 w-6 text-emerald-400 mr-2" />
                <span class="text-xl font-bold">GuideLocal</span>
              </div>
              <p class="text-gray-400 mb-4">Découvrez, partagez et recommandez les meilleurs endroits de votre ville.</p>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white">
                  <Facebook class="h-5 w-5" />
                </a>
                <a href="#" class="text-gray-400 hover:text-white">
                  <Twitter class="h-5 w-5" />
                </a>
                <a href="#" class="text-gray-400 hover:text-white">
                  <Instagram class="h-5 w-5" />
                </a>
                <a href="#" class="text-gray-400 hover:text-white">
                  <Linkedin class="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-400 hover:text-white">Accueil</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white">Explorer</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white">Catégories</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white">Ajouter un lieu</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white">Écrire un avis</a></li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4">Informations</h3>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-400 hover:text-white">À propos de nous</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white">Comment ça marche</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white">Règles de la communauté</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white">FAQ</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4">Contactez-nous</h3>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <Mail class="h-5 w-5 text-emerald-400 mr-2 mt-0.5" />
                  <span class="text-gray-400">contact@guidelocal.fr</span>
                </li>
                <li class="flex items-start">
                  <Phone class="h-5 w-5 text-emerald-400 mr-2 mt-0.5" />
                  <span class="text-gray-400">01 23 45 67 89</span>
                </li>
                <li class="flex items-start">
                  <MapPin class="h-5 w-5 text-emerald-400 mr-2 mt-0.5" />
                  <span class="text-gray-400">123 Rue Principale<br>75001 Paris, France</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {{ new Date().getFullYear() }} GuideLocal. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
  </template>

  <script lang="ts" setup>
import {
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from 'lucide-vue-next'


  </script>
