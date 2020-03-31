<template>
    <div id="roleMainBox" class="tableMainBox">
        <div class="searchBox">
            <el-input class="inputTextBox" v-model="queryModel.keyword" clearable
                      maxlength="40" prefix-icon="el-icon-search"
                      placeholder="请输入关键字搜索" size="mini"></el-input>
            <div class="el-button el-button--primary el-button--mini ml-2 float-left" @click="showDialogAddOrEdit()">
                <i class="el-icon-plus mr-2"></i>新增角色
            </div>
        </div>
        <el-table class="tableBox" :data="list" border width="100%" size="mini"
                  v-loading="tableIsLoading" default-expand-all row-key="moduleId"
                  :header-cell-style="getHeaderStyle()">
            <el-table-column type="index" align="center"></el-table-column>
            <el-table-column prop="name" label="角色名" width="160px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="code" label="角色标识" width="160px"></el-table-column>
            <el-table-column prop="sort" label="排序" width="160px"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column width="460px" label="操作">
                <template slot-scope="scope">
                    <el-button type="warning" size="mini" icon="el-icon-edit-outline"
                               @click="showDialogAddOrEdit(scope.row)">编辑
                    </el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="remove(scope.row)">删除
                    </el-button>
                    <el-button type="info" size="mini" plain icon="el-icon-lock" @click="showRoleAuthDialog(scope.row)">
                        权限配置
                    </el-button>
                    <el-button type="primary" size="mini" plain icon="el-icon-user"
                               @click="showRoleUserDialog(scope.row)">
                        人员配置
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                class="pageBox"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryModel.page"
                :page-sizes="[10,20, 50, 100]"
                :page-size="queryModel.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="queryModel.total">
        </el-pagination>

        <DialogRoleAddOrEdit ref="DialogRoleAddOrEdit"></DialogRoleAddOrEdit>
        <DialogRoleAuth ref="DialogRoleAuth"></DialogRoleAuth>
        <DialogRoleUser ref="DialogRoleUser"></DialogRoleUser>

    </div>
</template>

<script>
    import DialogRoleUser from "./DialogRoleUser";
    import DialogRoleAddOrEdit from "./DialogRoleAddOrEdit";
    import DialogRoleAuth from "./DialogRoleAuth";
    import BaseTableView from "../../../components/BaseTableView";

    export default {
        components: {DialogRoleAuth, DialogRoleAddOrEdit, DialogRoleUser},
        extends: BaseTableView,
        data() {
            return {
                module: "role",
            }
        },
        methods: {
            getList() {
                this.tableIsLoading = true;
                this.request.axiosGetData(this, this.module, this.queryModel, (data) => {
                    this.tableIsLoading = false;
                    this.queryModel.total = data.total;
                    this.list = data.list;
                }, (response) => {
                    this.tableIsLoading = false;
                });
            },
            showDialogAddOrEdit(row) {
                this.$refs.DialogRoleAddOrEdit.show(row, (data) => {
                    this.getList();
                });
            },
            showRoleAuthDialog(row) {
                this.$refs.DialogRoleAuth.show(row, () => {
                    this.getList();
                });
            },
            showRoleUserDialog(row) {
                this.$refs.DialogRoleUser.show(row);
            }
        }
    }


</script>

<style scoped lang="scss">


    .searchBox {
        position: absolute;
        top: 10px;
        line-height: 40px;

        .startDateBox {
            display: block;
            float: left;
            margin-right: 10px;
            line-height: 28px;
        }

        .inputTextBox {
            display: block;
            float: left;
            width: 300px;
            line-height: 28px;
        }

    }


    .tableMainBox {
        position: absolute;
        left: 10px;
        right: 10px;
        top: 0;
        bottom: 0;

        .tableBox {
            position: absolute;
            top: 48px;
            bottom: 60px;
            overflow: scroll;
            left: 0;
            right: 0;
        }

        .pageBox {
            position: absolute;
            bottom: 16px;
            left: 0px;
            right: 0;
        }
    }


    .el-table::before {
        height: 0;
    }

    .el-table--fit {
        border-right: 1px solid #EBEEF5;
        border-bottom: 1px solid #EBEEF5;
    }

</style>
