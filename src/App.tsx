import React from 'react'
import { Layout, Typography } from 'antd'
import CourseSelector from './components/CourseSelector'
import SemesterTable from './components/SemesterTable'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useAppDispatch } from './hooks/reduxHooks'
import { moveCourse } from './store/courseSlice'

const { Header, Sider, Content } = Layout
const { Title } = Typography

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) {
      return
    }

    const [destSemesterId] = destination.droppableId.split('-')
    const [sourceSemesterId] = source.droppableId.split('-')

    dispatch(
      moveCourse({
        courseId: result.draggableId,
        fromSemester: sourceSemesterId === 'courses' ? null : sourceSemesterId,
        toSemester: destSemesterId,
      })
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: '0 20px' }}>
          <Title level={2}>IT Program Course Scheduler</Title>
        </Header>
        <Layout>
          <Sider width={300} style={{ background: '#fff' }}>
            <CourseSelector />
          </Sider>
          <Content style={{ padding: '20px' }}>
            <SemesterTable />
          </Content>
        </Layout>
      </Layout>
    </DragDropContext>
  )
}

export default App
