import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
// import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('taskController');

  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    console.log('Task ID:', id);
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateStatusDto;
    return this.taskService.updateTaskStatus(id, status, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.taskService.deleteTask(id, user);
  }

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.taskService.getTasksFilters(filterDto);
  //   } else {
  //     return this.taskService.getAllTasks();
  //   }
  // }

  // // hht://localhost:3000/tasks/fgdfeegfdgfg
  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.taskService.getTaskById(id);
  // }

  // // @Post()
  // // createTask(@Body() body) {
  // //   console.log('Body:', body);
  // //   // console.log(`Body: ${body}`); x
  // // } // obj

  // // @Post()
  // // createTask(
  // //   @Body('title') title: string,
  // //   @Body('description') description: string,
  // // ) {
  // //   console.log('title:', title);
  // //   console.log('description:', description);
  // // }

  // // => without DTO
  // // @Post()
  // // createTask(
  // //   @Body('title') title: string,
  // //   @Body('description') description: string,
  // // ): Task {
  // //   return this.taskService.createTask(title, description);
  // // }

  // // Using DTO
  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.taskService.createTask(createTaskDto);
  // }
  // //   @Patch('/:id/status')
  // //   updateTaskStatus(
  // //     @Param('id') id: string,
  // //     @Body('status') status: TaskStatus,
  // //   ): Task {
  // //     return this.taskService.updateTaskStatus(id, status);
  // //   }
  // // }

  // // ******** with validation *****
  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   const { status } = updateStatusDto;
  //   return this.taskService.updateTaskStatus(id, status);
  // }
  // @Delete('/:id')
  // deleteTask(@Param('id') id: string) {
  //   return this.taskService.deleteTask(id);
  // }
}
