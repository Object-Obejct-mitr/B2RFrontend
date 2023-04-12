<template>
    <div class="card">
        <div class="card-body">
            <div class="d-flex flex-column align-items-center">
                <img
                    :src="props.user.photoURL"
                    alt=""
                    style="width: 150px; height: 150px"
                    class="rounded-circle"
                />
                <div class="text-center">
                    <p class="fw-bold mb-1">{{props.user.displayName}}</p>
                    <p class="text-muted mb-0">{{props.user.email}}</p>
                    <p class="text-muted mb-0" v-if="props.user.phoneNumber!=''" >{{props.user.phoneNumber}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
 export default{
 props: {
    user: Object
  },
    setup(props){
      const imgsrc=props.user.photoURL;
      const name=props.user.displayName;
      const email=props.user.email;
      const number=props.user.phoneNumber;
        console.log(props.user);
        return{
            props
        }
     }
}
     </script>
