<template>
    <el-dialog title="新增模块" :visible.sync="visible" v-if="row" top="10vh">
        <el-form :model="row">
            <el-form-item v-if="row.isChild" label="父模块名称" label-width="120px">
                <label style="line-height: 40px;" class="h3">{{row.parentModuleName}}</label>
            </el-form-item>
            <el-form-item label="模块名称" label-width="120px">
                <el-input v-model="row.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="模块编码" label-width="120px">
                <el-input v-model="row.code" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排序" label-width="120px">
                <el-input v-model="row.sort" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="路由地址" label-width="120px">
                <el-input v-model="row.to" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图标" label-width="120px">
                <el-input v-model="row.icon" autocomplete="off" class="float-left w-25"></el-input>
                <i :class="row.icon" class="el-button ml-2" style="height: 40px"></i>
            </el-form-item>
            <el-form-item label="操作项" label-width="120px">
                <el-table v-show="row.actionList && row.actionList.length!=0" class="tableBox" :data="row.actionList" border width="100%" size="mini">
                    <el-table-column type="index" align="center"></el-table-column>
                    <el-table-column prop="name" label="操作项名称" width="160px">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.name"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="code" label="操作项编码" width="160px">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.code"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column width="360px" label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeOne(scope.$index)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="addOne()" icon="el-icon-plus" size="mini">增加一行</el-button>
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
        name: "DialogModuleAddOrEdit",
        extends: BaseDialog,
        data() {
            return {}
        },
        methods: {
            addOne() {
                if (!this.row.actionList) {
                    this.row.actionList = [];
                }
                this.row.actionList.push({});
                this.$forceUpdate();
            },
            removeOne(index) {
                if (!this.row.actionList) {
                    this.row.actionList = [];
                }
                this.row.actionList.splice(index, 1);
                this.$forceUpdate();
            },
            submit() {
                if (this.row.moduleId) {
                    this.request.axiosInsertModule(this, this.row, (data) => {
                        this.close();
                    });
                } else {
                    this.request.axiosUpdateModule(this, this.row, (data) => {
                        this.close();
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>