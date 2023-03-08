<script>
import { RouterLink, RouterView } from "vue-router";

export default {
    data() {
        return {
            signedIn: true,
            user: "Matthew",
        };
    },
};
</script>

<template>
    <div v-if="!signedIn" class="d-flex align-items-center">
        <button type="button" class="btn btn-primary px-3 me-2">Log In</button>
        <button type="button" class="btn btn-primary px-3 me-2">Sign Up</button>
    </div>
    <div v-if="signedIn" class="d-flex align-items-center">
        <div class="d-flex flex-column align-items-center">
            <h4>Welcome, {{ user }}</h4>
            <div class="d-flex flex-row">
                <RouterLink to="/profile"
                    ><button class="btn btn-primary px-3">
                        View Profile
                    </button></RouterLink
                >
                <button class="btn btn-link px-3">Sign Out</button>
            </div>
        </div>
        <img
            src="https://media.licdn.com/dms/image/C4D03AQGsaJTyy0iuwQ/profile-displayphoto-shrink_200_200/0/1655171469744?e=1680134400&v=beta&t=Fvrwjjpjgf2BkSVQR_lQQ0VV5QRj8vPafOKAe9Ueszg"
            class="rounded-circle px-3"
            height="80"
        />
    </div>
</template>
