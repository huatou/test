<template>
    <div>
        <el-dialog title="配置角色人员" :visible.sync="visible" top="10vh">
            <div>
                <el-input v-model="queryModel.keyword" clearable style="width: 200px"
                          maxlength="40" prefix-icon="el-icon-search"
                          placeholder="请输入关键字搜索" size="mini"></el-input>
                <div class="el-button el-button--primary el-button--mini ml-2 " @click="showUserChooseDialog()">
                    <i class="el-icon-plus mr-2"></i>选择人员
                </div>
            </div>
            <el-table height="300px" :data="list" border size="mini"
                      v-loading="tableIsLoading" style="margin-top: 10px"
                      :header-cell-style="getHeaderStyle()">
                <el-table-column type="index" align="center"></el-table-column>
                <el-table-column prop="username" label="用户名" width="160px" show-overflow-tooltip></el-table-column>
                <el-table-column prop="displayName" label="姓名" width="160px"></el-table-column>
                <el-table-column width="100px" label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" icon="el-icon-edit-outline"
                                   @click="remove(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    style="margin-top: 10px"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryModel.page"
                    :page-sizes="[10,20, 50, 100]"
                    :page-size="queryModel.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="queryModel.total">
            </el-pagination>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dismiss()">关闭</el-button>
            </div>
        </el-dialog>
        <DialogUserChoose ref="DialogUserChoose"></DialogUserChoose>
    </div>
</template>

<script>

    import BaseDialog from "../../../components/Dialog/BaseDialog";
    import DialogUserChoose from "../User/DialogUserChoose";

    export default {
        name: "DialogRoleUser",
        components: {DialogUserChoose},
        extends: BaseDialog,
        data() {
            return {
                module: "role-user",
            }
        },
        methods: {
            getData() {
                this.tableIsLoading = true;
                const queryModel = this.jquery.extend({
                    roleId: this.row.roleId
                }, this.queryModel)
                this.request.axiosGetData(this, this.module, queryModel, (data) => {
                    this.tableIsLoading = false;
                    this.queryModel.total = data.total;
                    this.list = data.list;
                }, (response) => {
                    this.tableIsLoading = false;
                });
            },
            showUserChooseDialog() {
                this.$refs.DialogUserChoose.show(null, (data) => {
                    let roleUserList = [];
                    data.forEach((user) => {
                        roleUserList.push({
                            userId: user.userId,
                            roleId: this.row.roleId
                        });
                    });
                    this.request.axiosRoleUserPost(this, roleUserList, () => {
                        this.getData();
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>