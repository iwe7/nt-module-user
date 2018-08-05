import { OrganizationService } from './../services/organization.service';
import { Resolver, Query, Mutation } from '@nestjs/graphql';

@Resolver()
export class OrganizationResolver {
    constructor (
        private readonly organizationService: OrganizationService
    ) {}

    @Query('getRoots')
    async getRoots() {
        const roots = await this.organizationService.getRoots();
        return {code: 200, message: '获取成功', data: roots};
    }

    @Query('getAll')
    async getAll() {
        const organizationArr = await this.organizationService.getAll();
        return {code: 200, message: '获取成功', data: organizationArr};
    }

    @Query('findChildren')
    async findChildren(req, body: {id: number}) {
        const {id} = body;
        const organizationArr = await this.organizationService.findChildren(id);
        return {code: 200, message: '获取成功', data: organizationArr};
    }

    @Mutation('createOrganization')
    async createOrganization(req, body: {name: string, parentId: number}) {
        const {name, parentId} = body;
        await this.organizationService.createOrganization(name, parentId);
        return {code: 200, message: '添加成功'};
    }

    @Mutation('updateOrganization')
    async updateOrganization(req, body: {id: number, name: string, parentId: number}) {
        const {id, name, parentId} = body;
        await this.organizationService.updateOrganization(id, name, parentId);
        return {code: 200, message: '更新成功'};
    }

    @Mutation('deleteOrganization')
    async deleteOrganization(req, body: {id: number}) {
        const {id} = body;
        await this.organizationService.deleteOrganization(id);
        return {code: 200, message: '删除成功'};
    }
}