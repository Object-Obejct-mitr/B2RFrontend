<template>
    <a
        class="btn btn-sm btn-info me-2"
        data-mdb-toggle="modal"
        :data-mdb-target="'#descriptionModal' + id"
    ><i class="fas fa-info-circle"></i
    ></a>
    <div
        :id="'descriptionModal' + id"
        class="modal fade nonGrab modal-lg container-fluid"
        tabindex="-1"
        role="dialog"
    >
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <form id="user_descriptionForm" @submit.prevent="addContact">
                    <div class="modal-header">
                        <div v-if="user.id">{{ user.id }}</div>
                        <h5 class="modal-title">
                            {{ user.firstName }} {{ user.surName }}
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-mdb-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <p>{{ user.description }}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-mdb-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
        id: String,
    },

    setup() {
        return {};
    },
    data() {
        return {};
    },
    methods: {},
};
</script>
