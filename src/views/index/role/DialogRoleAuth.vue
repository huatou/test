<template>
    <el-dialog title="权限配置" :visible.sync="visible" v-if="row" top="10vh">
        <el-form :model="row">
            <el-form-item label="角色:" label-width="120px">
                <label style="line-height: 40px;"
                       class="h5">{{row.roleName+'('+row.code+')'}}</label>
            </el-form-item>
            <div style="border: 1px solid #cccccc;border-bottom: none">
                <div style="border-bottom: 1px solid #cccccc;padding: 10px"
                     v-for="moduleItem in list">
                    <label class="moduleNameLabel">{{moduleItem.name}}</label>
                    <el-checkbox v-if="!moduleItem.children || moduleItem.children.length == 0"
                                 v-for="moduleActionItem in moduleItem.actionList"
                                 :label="moduleActionItem.actionName"
                                 v-model="moduleActionItem.isChecked"></el-checkbox>
                    <div v-for="moduleChildItem in moduleItem.children">
                        <label class="moduleNameLabel"
                               style="font-size: 12px">>>{{moduleChildItem.name}}</label>
                        <el-checkbox
                                v-for="moduleActionItem in moduleChildItem.actionList"
                                :label="moduleActionItem.actionName"
                                v-model="moduleActionItem.isChecked"></el-checkbox>
                    </div>
                </div>
            </div>
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
        name: "DialogRoleAuth",
        extends: BaseDialog,
        data() {
            return {
                module: 'role'
            }
        },
        methods: {
            getData() {
                let params = {roleId: this.row.roleId}
                this.request.axiosGetData(this, this.module, params, (data) => {
                    if (data) {
                        this.jquery.extend(this.row, data);
                        this.getModuleActionList();
                    } else {
                        alert("获取角色权限失败")
                    }
                });
            },
            moduleListFilter(moduleList) {
                moduleList.forEach(moduleItem => {
                    if (!moduleItem.children || moduleItem.children.length == 0) {
                        moduleItem.actionList.forEach(actionItem => {
                            if (this.row.moduleActionList) {
                                this.row.moduleActionList.forEach(roleModuleActionItem => {
                                    if (actionItem.moduleActionId == roleModuleActionItem.moduleActionId) {
                                        actionItem.isChecked = true;
                                    }
                                });
                            }
                        })
                    } else {
                        this.moduleListFilter(moduleItem.children);
                    }
                });
                this.list = this.jquery.extend([], moduleList);
            },
            getModuleActionList() {
                this.list = [];
                this.request.axiosGetModuleList(this, (data) => {
                    this.moduleListFilter(data);
                });
            },
            submitModuleActionFilter(moduleList, submitModuleActionList) {
                moduleList.forEach(moduleItem => {
                    if (!moduleItem.children || moduleItem.children.length == 0) {
                        moduleItem.actionList.forEach(moduleActionItem => {
                            if (moduleActionItem.isChecked) {
                                submitModuleActionList.push(moduleActionItem);
                            }
                        });
                    } else {
                        this.submitModuleActionFilter(moduleItem.children, submitModuleActionList);
                    }
                });
            },
            submit() {
                let moduleActionList = [];
                this.submitModuleActionFilter(this.list, moduleActionList)
                this.row.moduleActionList = moduleActionList;
                this.request.axiosRoleAuthPost(this, this.row, (data) => {
                    this.close();
                });
            }
        }
    }
</script>

<style scoped>

    .moduleNameLabel {
        font-size: 16px;
        font-weight: bold;
        line-height: 30px;
        width: 168px;
        margin-bottom: 0;
    }

</style>