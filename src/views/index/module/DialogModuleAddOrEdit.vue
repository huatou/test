<template>
    <el-dialog :title="title()" :visible.sync="visible" v-if="row" top="10vh">
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
            <el-form-item label="操作项" label-width="120px" style="line-height: 48px" v-loading="tableIsLoading">
                <el-checkbox :v-loading="tableIsLoading"
                             v-for="(actionItem,actionItemIndex) in actionList"
                             :label="actionItem.name"
                             v-model="actionItem.isChecked"
                             :key="actionItemIndex" border style="margin-right: 10px"></el-checkbox>
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
            return {
                module: 'module',
                actionList: []
            }
        },
        methods: {
            getData() {
                if (this.row.moduleId) {
                    let params = {moduleId: this.row.moduleId};
                    this.request.axiosGetData(this, this.module, params, (data) => {
                        if (data) {
                            this.jquery.extend(this.row, data);
                            this.getActionList();
                        } else {
                            alert("获取模块详情失败")
                        }
                    });
                } else {
                    this.getActionList();
                }
            },
            getActionList() {
                this.actionList = [];
                this.request.axiosGetActionList(this, (actionList) => {
                    actionList.forEach(actonItem => {
                        if (this.row.actionList) {
                            this.row.actionList.forEach(moduleActionItem => {
                                if (actonItem.actionId == moduleActionItem.actionId) {
                                    actonItem.isChecked = true;
                                }
                            });
                        }
                    });
                    this.actionList = this.jquery.extend([], actionList);
                    this.tableIsLoading = false;
                }, (error) => {
                    this.tableIsLoading = false;
                });
            },
            submit() {
                this.row.actionList = [];
                this.actionList.forEach((actionItem) => {
                    if (actionItem.isChecked) {
                        this.row.actionList.push(actionItem);
                    }
                });
                if (this.row.moduleId) {
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
                if (this.row.moduleId) {
                    if (this.row.isChild) {
                        return "新增子模块";
                    }
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