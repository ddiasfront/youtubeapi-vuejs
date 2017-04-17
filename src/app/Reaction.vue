<template>
    <button @click="destroy">Destroy</button>
</template>

<script>
    export default {
        props: [
            'reaction',
        ],
        methods: {
            destroy() {
                this.$emit('destroy', this.reaction) //this.reaction is the data being passed up to the parent. In this case, we're passing the parent's `reaction` prop back up, but it could also be a property from the child component's data object.
            }
        },
    }
</script>