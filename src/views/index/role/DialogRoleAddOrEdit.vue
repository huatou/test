<template>
    <el-dialog :title="title()" :visible.sync="visible" top="10vh">
        <el-form :model="row">
            <el-form-item label="角色名" label-width="120px">
                <el-input v-model="row.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色标识" label-width="120px">
                <el-input v-model="row.code" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排序" label-width="120px">
                <el-input v-model="row.sort" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dismiss()">取 消</el-button>
            <el-button type="primary" @click="submit()">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>

    import BaseDialog from "../../../components/Dialog/BaseDialog";

    export default {
        extends: BaseDialog,
        data() {
            return {
                module: 'role'
            }
        },
        methods: {
            submit() {
                if (this.row.roleId) {
                    this.request.axiosPutData(this, this.module, this.row, (data) => {
                        this.close();
                    });
                } else {
                    this.request.axiosPostData(this, this.module, this.row, (data) => {
                        this.close();
                    });
                }
            },
            title: function () {
                if (this.row.roleId) {
                    return "编辑";
                } else {
                    return "新增";
                }
            }
        }
    }
</script>

<style scoped>

</style>