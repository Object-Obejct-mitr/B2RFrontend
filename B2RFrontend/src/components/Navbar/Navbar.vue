<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavbarUser from "./NavbarUser.vue"
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand">
        <img
          src="/src/assets/img/barn2roboticslogo.png"
          height="80"
          loading="lazy"
        />
      </a>
      <ul class="navbar-nav me-auto ml-30 mt-2 lh-lg ">
          <li class="navbar-item"><RouterLink to="/" aria-current="page" class="nav-link">
              <h4>Blog</h4>
              </RouterLink>
          </li>
          <li class="navbar-item"><RouterLink to="/progress" class="nav-link" aria-current="page" href="#">
              <h4>Progress Tool</h4>
              </RouterLink>
          </li>
          <li class="navbar-item"><RouterLink to="/orgchart" class="nav-link" aria-current="page" href="#">
              <h4>Org Chart</h4>
              </RouterLink>
          </li>
          <li class="navbar-item"><RouterLink to="/contacts" class="nav-link" aria-current="page" href="#">
              <h4>Contacts</h4>
              </RouterLink>
          </li>
          <li class="navbar-item"><RouterLink to="/adminconsole" class="nav-link" aria-current="page" href="#">
              <h4>Admin Console</h4>
              </RouterLink>
          </li>
      </ul>
      <NavbarUser />
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  color: #000!important;
}
</style>