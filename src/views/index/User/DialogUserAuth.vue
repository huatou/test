<template>
    <el-dialog title="权限配置" :visible.sync="visible" v-if="row" top="10vh">
        <el-form :model="row">
            <el-form-item label="用户" label-width="120px">
                <label style="line-height: 40px;" class="h3">{{row.displayName+'('+row.username+')'}}</label>
            </el-form-item>
            <div style="border: 1px solid #cccccc;border-bottom: none" v-loading="tableIsLoading">
                <div style="border-bottom: 1px solid #cccccc;padding: 10px"
                     v-for="(moduleItem,moduleItemIndex ) in list" :key="moduleItemIndex">
                    <label class="moduleNameLabel">{{moduleItem.moduleName}}</label>
                    <el-checkbox v-if="!moduleItem.children || moduleItem.children.length == 0"
                                 v-for="(moduleActionItem ,moduleActionItemIndex) in moduleItem.moduleActionList"
                                 :label="moduleActionItem.actionName"
                                 :key="moduleActionItemIndex"
                                 v-model="moduleActionItem.isChecked"></el-checkbox>
                    <div v-for="(moduleChildItem,moduleChildItemIndex ) in moduleItem.children"
                         :key="moduleChildItemIndex">
                        <label class="moduleNameLabel"
                               style="font-size: 12px">>>{{moduleChildItem.moduleName}}</label>
                        <el-checkbox
                                v-for="(moduleActionItem ,moduleActionItemIndex) in moduleChildItem.moduleActionList"
                                :label="moduleActionItem.actionName"
                                :key="moduleActionItemIndex"
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
        name: "DialogUserAuth",
        extends: BaseDialog,
        methods: {
            getData() {
                let params = {userId: this.row.userId}
                this.request.axiosGetUser(this, params, (data) => {
                    if (data) {
                        this.jquery.extend(this.row, data);
                        this.getModuleActionList();
                    } else {
                        alert("获取用户权限失败")
                    }
                });
            },
            moduleActionListFilter(moduleList) {
                moduleList.forEach(moduleItem => {
                    if (!moduleItem.children || moduleItem.children.length == 0) {
                        moduleItem.moduleActionList.forEach(moduleActionItem => {
                            this.row.moduleActionList.forEach(userModuleActionItem => {
                                if (moduleActionItem.moduleActionId == userModuleActionItem.moduleActionId) {
                                    moduleActionItem.isChecked = true;
                                    return;
                                }
                            });
                        });
                    } else {
                        this.moduleActionListFilter(moduleItem.children)
                    }
                });

            },
            getModuleActionList() {
                this.list = [];
                this.request.axiosGetModuleList(this, (moduleList) => {
                    this.list = this.jquery.extend([], moduleList);
                    this.moduleActionListFilter(moduleList);
                });
            },
            submitModuleActionListFilter(moduleList, submitActionList) {
                moduleList.forEach(moduleItem => {
                    if (!moduleItem.children || moduleItem.children.length == 0) {
                        moduleItem.moduleActionList.forEach(moduleActionItem => {
                            if (moduleActionItem.isChecked) {
                                submitActionList.push(moduleActionItem);
                                return;
                            }
                        });
                    } else {
                        this.submitModuleActionListFilter(moduleItem.children, submitActionList);
                    }
                })
            },
            submit() {
                let submitActionList = [];
                this.submitModuleActionListFilter(this.list, submitActionList);
                this.row.moduleActionList = this.jquery.extend([], submitActionList);
                this.request.axiosUserAuthPost(this, this.row, (data) => {
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