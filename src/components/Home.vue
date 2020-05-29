<template>
    <div>
        home home home 
        <el-button type="info" @click='checkout'>退出</el-button>
    </div>
</template>


<script>
export default {
    methods:{
        checkout(){
            window.sessionStorage.removeItem('token')
            this.$Message.success('退出成功')
            this.$router.push('/login')
        }
    }
}
</script>


<style lang="scss" scope>
    
</style>