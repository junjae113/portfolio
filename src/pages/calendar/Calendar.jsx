import { format } from 'date-fns';
import { useState } from 'react';
import ScheduleModal from '../chat/ScheduleModal';
import CalendarDay from './CalendarDay';
import CalendarMonth from './CalendarMonth';
import ComingSchedule from './ComingSchedule';
import CompletedSchedule from './CompletedSchedule';
import MiniCalendar from './MiniCalendar';
import S from './style2';

const Calendar = () => {
  // MiniCalendar에서 보낸 selectedDate 관리
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd')); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [viewMode, setViewMode] = useState('month');
  const [refreshKey, setRefreshKey] = useState(0);

  

  // MiniCalendar에서 가져온 날짜 등록
  const handleMiniCalendarDateClick = (date) => {
    setSelectedDate(date);
    setViewMode('day');
  };

  // ComingSchedule에서 가져온 item 등록
  const handleComingItemClick = (item) => {
    setViewMode('day');
  }

  // CompletedSchedule에서 가져온 item 등록
  const handleCompletedItemClick = (item) => {
    setViewMode('day');
  } 

  // 월별 캘린더에서 빈날짜칸 눌렀을 때
  // 일정 모달창 열림
  const handleDateClick = (clickedDate) => {
    setSelectedDate(clickedDate);
    setIsModalOpen(true);
  };

  // 월별캘린더 일정 제목 클릭 시
  const handleEventClick = (scheduleInfo, scheduleDate) => {
    setSelectedSchedule(scheduleInfo)
    setSelectedDate(scheduleDate);
    setViewMode('day');
  };

  // MonthCalender로 이동 -> 이거 나중에 DayCalender 에서 월 클릭하면 연결하기 
  const handleBackToMonth = () => { 
    setViewMode('month');
  };

  // 일정 등록 성공 시 호출될 콜백
  const handleScheduleAdded = () => {
    setRefreshKey((k) => (k + 1));
  }

  return (
    <S.Container>
      <S.Sidebar>
        <MiniCalendar onDateClick={handleMiniCalendarDateClick} />
        <ComingSchedule onComingItemClick={handleComingItemClick} />
        <CompletedSchedule onCompletedItemClick={handleCompletedItemClick} />
      </S.Sidebar>

      <S.Main mt={20} mr={20} mb={20} ml={15}>
        {viewMode === 'day' ? (
          <CalendarDay
            scheduleInfo={selectedSchedule}
            onBack={handleBackToMonth}
            initialDate={selectedDate}
            refreshKey={refreshKey}
          />
        ) : (
          <CalendarMonth
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
            refreshKey={refreshKey}
            initialDate={selectedDate}
          />
        )}
      </S.Main>

      {isModalOpen && (
        <ScheduleModal
          step={2}
          date={selectedDate}
          onClose={() => setIsModalOpen(false)}
          onAddSchedule={handleScheduleAdded}
        />
      )}
  </S.Container>
  );
};

export default Calendar;
