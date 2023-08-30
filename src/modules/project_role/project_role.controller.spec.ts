import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRoleController } from './project_role.controller';
import { ProjectRoleService } from './project_role.service';

describe('ProjectRoleController', () => {
  let controller: ProjectRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectRoleController],
      providers: [ProjectRoleService],
    }).compile();

    controller = module.get<ProjectRoleController>(ProjectRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
