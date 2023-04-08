<template>
    <div class="card">
        <div class="card-body">
            <div class="d-flex flex-column align-items-center">
                <img
                    :src="imgsrc"
                    alt=""
                    style="width: 150px; height: 150px"
                    class="rounded-circle"
                />
                <div class="text-center">
                    <p class="fw-bold mb-1">{{name}}</p>
                    <p class="text-muted mb-0">{{email}}</p>
                    <p class="text-muted mb-0" v-if="nubmer!=''" >{{number}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
 export default{
    setup(props){
      const imgsrc=props.user.photoURL;
      const name=props.user.displayName;
      const email=props.user.email;
      const number=props.user.phoneNumber;
     }
}
     </script>
