import React from 'react'
import { Table, Typography } from 'antd'
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Course } from '../types/course'
import { moveCourse } from '../store/courseSlice'

const { Title } = Typography

const SemesterTable: React.FC = () => {
  const semesters = useAppSelector(state => state.courses.semesters)
  const dispatch = useAppDispatch()

  const renderCourseCell = (semesterId: string, courseIndex: number) => {
    const semester = semesters.find(s => s.id === semesterId)
    const course: Course | undefined = semester?.courses[courseIndex]

    return (
      <Droppable droppableId={`${semesterId}-${courseIndex}`} isDropDisabled={false}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: 80, border: '1px dashed #ccc', padding: 8 }}
          >
            {course && (
              <Draggable draggableId={course.id} index={courseIndex}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      userSelect: 'none',
                      padding: 8,
                      minHeight: '40px',
                      backgroundColor: '#fff',
                      ...provided.draggableProps.style,
                    }}
                  >
                    {course.name}
                  </div>
                )}
              </Draggable>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    )
  }

  const columns = semesters.map(semester => ({
    title: `Semester ${semester.id}`,
    dataIndex: semester.id,
    key: semester.id,
    render: (_: any, __: any, index: number) => renderCourseCell(semester.id, index),
  }))

  const data = [{ key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }]

  const totalCourses = semesters.reduce((total, semester) => total + semester.courses.length, 0)

  return (
    <div>
      <Title level={3}>Selected Courses: {totalCourses}</Title>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  )
}

export default SemesterTable
