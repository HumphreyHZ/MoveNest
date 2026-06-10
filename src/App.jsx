import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flame,
  Home,
  Leaf,
  Pause,
  RotateCcw,
  Sparkles,
  Timer,
  Wind,
} from 'lucide-react';
import workoutImage from './assets/workout-low-impact-full-body.png';
import mobilityImage from './assets/workout-gentle-mobility-flow.png';
import eveningStretchImage from './assets/workout-evening-stretch-unwind.png';
import moveChairSquat from './assets/move-chair-squat.png';
import moveCooldownStretch from './assets/move-cooldown-stretch.png';
import moveGentleWarmup from './assets/move-gentle-warmup.png';
import moveStandingCore from './assets/move-standing-core.png';
import moveWallPushup from './assets/move-wall-pushup.png';

const courses = [
  {
    id: 'low-impact-reset',
    planName: "Today's Plan",
    recommendation: '12-min Low Impact Full Body',
    title: 'Low Impact Full Body Reset',
    duration: '12 min',
    image: workoutImage,
    imageAlt: 'A woman doing a gentle chair squat at home.',
    imagePosition: 'center center',
    listImageScale: 1.14,
    level: 'Beginner',
    tags: ['No equipment', 'Apartment friendly', 'Beginner level'],
    goals: ['Energy', 'Mobility', 'Light Sweat'],
    moves: [
      { name: 'Gentle Warm-up', image: moveGentleWarmup },
      { name: 'Chair Squat', image: moveChairSquat },
      { name: 'Wall Push-up', image: moveWallPushup },
      { name: 'Standing Core', image: moveStandingCore },
      { name: 'Cool-down Stretch', image: moveCooldownStretch },
    ],
    activeMoves: [
      {
        name: 'Chair Squat',
        tip: 'Keep your chest open. Move slowly.',
        seconds: 45,
      },
      {
        name: 'Standing Core',
        tip: 'Keep one hand near the wall if balance feels tender.',
        seconds: 40,
      },
    ],
  },
  {
    id: 'gentle-mobility-flow',
    planName: 'Mobility Pick',
    recommendation: '8-min Gentle Mobility Flow',
    title: 'Gentle Mobility Flow',
    duration: '8 min',
    image: mobilityImage,
    imageAlt: 'A woman doing a gentle standing side bend at home.',
    imagePosition: 'center center',
    level: 'Beginner',
    tags: ['Small space', 'No equipment', 'Morning friendly'],
    goals: ['Mobility', 'Energy', 'Posture'],
    moves: [
      { name: 'Shoulder Openers', image: moveGentleWarmup },
      { name: 'Side Reach', image: moveCooldownStretch },
      { name: 'Standing Hip Circles', image: moveStandingCore },
      { name: 'Wall Chest Stretch', image: moveWallPushup },
      { name: 'Slow Neck Release', image: moveGentleWarmup },
    ],
    activeMoves: [
      {
        name: 'Side Reach',
        tip: 'Reach long through your fingertips. Keep your breath easy.',
        seconds: 40,
      },
      {
        name: 'Wall Chest Stretch',
        tip: 'Keep the shoulder low and stop before any sharp pull.',
        seconds: 35,
      },
    ],
  },
  {
    id: 'evening-stretch-unwind',
    planName: 'Evening Option',
    recommendation: '10-min Evening Stretch Unwind',
    title: 'Evening Stretch Unwind',
    duration: '10 min',
    image: eveningStretchImage,
    imageAlt: 'A woman doing a calm seated stretch on a mat at home.',
    imagePosition: 'center center',
    listImageScale: 1.14,
    level: 'Beginner',
    tags: ['Quiet pace', 'Mat optional', 'Low intensity'],
    goals: ['Relaxation', 'Mobility', 'Recovery'],
    moves: [
      { name: 'Breathing Reset', image: moveGentleWarmup },
      { name: 'Seated Side Stretch', image: moveCooldownStretch },
      { name: 'Hamstring Fold', image: moveCooldownStretch },
      { name: 'Gentle Twist', image: moveStandingCore },
      { name: 'Calm Cool-down', image: moveGentleWarmup },
    ],
    activeMoves: [
      {
        name: 'Seated Side Stretch',
        tip: 'Let the ribs soften. Keep the stretch easy.',
        seconds: 45,
      },
      {
        name: 'Gentle Twist',
        tip: 'Turn slowly and keep both hips grounded.',
        seconds: 40,
      },
    ],
  },
];

const checkInOptions = [
  'I feel tired',
  'I have knee discomfort',
  'I only have 8 minutes',
];

const feedbackOptions = ['Too easy', 'Just right', 'Too hard'];

function App() {
  const [screen, setScreen] = useState('welcome');
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0].id);
  const [selectedCheckIns, setSelectedCheckIns] = useState(['I feel tired']);
  const [tooHard, setTooHard] = useState(false);
  const [feedback, setFeedback] = useState('Just right');
  const [isPaused, setIsPaused] = useState(false);
  const [activeMoveIndex, setActiveMoveIndex] = useState(0);
  const selectedCourse =
    courses.find((course) => course.id === selectedCourseId) ?? courses[0];
  const [remainingSeconds, setRemainingSeconds] = useState(
    selectedCourse.activeMoves[0].seconds,
  );

  function navigate(nextScreen) {
    setScreen(nextScreen);
    if (nextScreen === 'active') {
      setActiveMoveIndex(0);
      setRemainingSeconds(selectedCourse.activeMoves[0].seconds);
      setIsPaused(false);
      setTooHard(false);
    }
  }

  function selectCourse(courseId) {
    setSelectedCourseId(courseId);
    setScreen('detail');
  }

  function toggleCheckIn(option) {
    setSelectedCheckIns((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  }

  const activeMove = selectedCourse.activeMoves[activeMoveIndex];

  useEffect(() => {
    if (screen !== 'active' || isPaused || remainingSeconds <= 0) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setRemainingSeconds((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isPaused, remainingSeconds, screen]);

  useEffect(() => {
    setRemainingSeconds(selectedCourse.activeMoves[activeMoveIndex].seconds);
  }, [activeMoveIndex, selectedCourse]);

  const shellClass =
    screen === 'welcome'
      ? 'bg-[linear-gradient(180deg,#f7bd94_0%,#f9d7b9_31%,#f2f2f7_62%)]'
      : 'bg-health-bg';

  const page = {
    welcome: <WelcomeScreen onStart={() => navigate('home')} />,
    home: (
      <HomeScreen
        courses={courses}
        selectedCourse={selectedCourse}
        selectedCheckIns={selectedCheckIns}
        onToggleCheckIn={toggleCheckIn}
        onOpenWorkout={selectCourse}
        onBack={() => navigate('welcome')}
      />
    ),
    detail: (
      <WorkoutDetailScreen
        course={selectedCourse}
        onBack={() => navigate('home')}
        onStart={() => navigate('active')}
      />
    ),
    active: (
      <ActiveWorkoutScreen
        activeMove={activeMove}
        activeMoveIndex={activeMoveIndex}
        course={selectedCourse}
        isPaused={isPaused}
        remainingSeconds={remainingSeconds}
        tooHard={tooHard}
        onPause={() => setIsPaused((value) => !value)}
        onTooHard={() => setTooHard(true)}
        onSkip={() =>
          setActiveMoveIndex((index) =>
            Math.min(index + 1, selectedCourse.activeMoves.length - 1),
          )
        }
        onBack={() => navigate('detail')}
        onComplete={() => navigate('completion')}
      />
    ),
    completion: (
      <CompletionScreen
        course={selectedCourse}
        feedback={feedback}
        onBack={() => navigate('active')}
        onFeedback={setFeedback}
        onSavePlan={() => navigate('home')}
      />
    ),
  }[screen];

  return (
    <main className="min-h-screen bg-[#dedee6] px-0 py-0 text-health-ink sm:px-6 sm:py-4">
      <section
        className={`mx-auto flex h-[100svh] min-h-[700px] w-full max-w-[430px] flex-col overflow-hidden shadow-phone sm:h-[min(932px,calc(100svh-32px))] sm:rounded-[2.75rem] ${shellClass}`}
      >
        <StatusBar />
        <div className="phone-scroll flex-1 overflow-y-auto">{page}</div>
      </section>
    </main>
  );
}

function WelcomeScreen({ onStart }) {
  return (
    <ScreenFrame className="relative justify-between pb-0">
      <div className="pb-28">
        <header className="pt-12">
        <div className="mb-7 flex items-center justify-between">
          <h1 className="text-[4.15rem] font-black leading-[0.88] tracking-normal text-black">
            Move
            <br />
            Nest
          </h1>
          <Avatar />
          </div>
          <p className="max-w-[18rem] text-[1.95rem] font-black leading-tight text-black">
            Start small. Feel stronger at home.
          </p>
        </header>

        <div className="mt-8">
          <HealthCard className="p-7">
          <div className="flex items-start gap-4">
            <IconBubble color="orange">
              <Leaf className="h-6 w-6" strokeWidth={2.7} />
            </IconBubble>
            <div>
              <p className="text-[1.7rem] font-black leading-tight text-black">
                Personalized 12-minute workouts
              </p>
              <p className="mt-3 text-lg font-semibold leading-7 text-health-muted">
                For your energy, space and mood.
              </p>
            </div>
          </div>
          </HealthCard>
        </div>
      </div>

      <div className="sticky bottom-0 z-20 -mx-6 bg-gradient-to-t from-health-bg via-health-bg/95 to-transparent px-6 pb-6 pt-5">
        <PrimaryButton onClick={onStart}>
          Start as Guest
          <ArrowRight className="h-5 w-5" strokeWidth={3} />
        </PrimaryButton>
      </div>
    </ScreenFrame>
  );
}

function HomeScreen({
  courses,
  selectedCourse,
  selectedCheckIns,
  onToggleCheckIn,
  onOpenWorkout,
  onBack,
}) {
  const recommendedCourse = courses[0];
  const personalization = useMemo(() => {
    if (selectedCheckIns.includes('I only have 8 minutes')) {
      return 'Trimmed to a shorter, calmer first session.';
    }
    if (selectedCheckIns.includes('I have knee discomfort')) {
      return 'Matched with no jumping and softer lower-body work.';
    }
    return 'Matched to a low-pressure start after a long day.';
  }, [selectedCheckIns]);

  return (
    <ScreenFrame>
      <AppHeader onBack={onBack} title="Home" showAvatar />

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between px-5">
          <h2 className="text-[1.7rem] font-black tracking-normal text-black">
            Today's recommendation
          </h2>
          <button
            type="button"
            className="text-[1.35rem] font-semibold text-health-blue transition active:scale-95"
          >
            Edit
          </button>
        </div>

        <button
          type="button"
          onClick={() => onOpenWorkout(recommendedCourse.id)}
          className="group block w-full text-left outline-none"
        >
          <HealthCard className="min-h-[174px] p-6 transition duration-200 group-hover:-translate-y-0.5 group-active:scale-[0.99]">
            <div className="flex items-center justify-between">
              <MetricLabel color="orange" icon={<Flame />}>
                {recommendedCourse.planName}
              </MetricLabel>
              <div className="flex items-center gap-2 text-health-muted">
                <span className="text-lg font-semibold">Today</span>
                <ChevronRight className="h-7 w-7 text-health-chevron" />
              </div>
            </div>

            <CourseImage
              course={recommendedCourse}
              className="mt-5 aspect-[16/9] w-full"
            />

            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-[2.6rem] font-black leading-none text-black">
                  {getCourseMinutes(recommendedCourse.duration)}
                  <span className="ml-2 text-[1.35rem] font-black text-health-muted">
                    min
                  </span>
                </p>
                <p className="mt-3 text-[1.55rem] font-black leading-7 text-black">
                  {recommendedCourse.recommendation}
                </p>
              </div>
              <MiniBars />
            </div>
            <div className="mt-7 flex items-center justify-between rounded-full bg-health-orange px-5 py-3 text-lg font-black text-white">
              <span>Select this class</span>
              <ArrowRight className="h-5 w-5" strokeWidth={3} />
            </div>
          </HealthCard>
        </button>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {recommendedCourse.tags.map((tag) => (
            <div
              key={tag}
              className="rounded-[1.45rem] bg-white px-3 py-4 text-center text-[0.82rem] font-black leading-5 text-health-muted shadow-card"
            >
              {tag}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-9">
        <SectionTitle
          title="Check-in"
          description="A light AI adjustment before you begin."
        />
        <HealthCard className="mt-4 p-5">
          <div className="mb-5 flex items-start gap-3">
            <IconBubble color="blue">
              <Sparkles className="h-5 w-5" strokeWidth={2.8} />
            </IconBubble>
            <p className="text-base font-bold leading-6 text-health-muted">
              {personalization}
            </p>
          </div>
          <div className="space-y-3">
            {checkInOptions.map((option) => {
              const active = selectedCheckIns.includes(option);
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => onToggleCheckIn(option)}
                  className={`flex min-h-14 w-full items-center justify-between rounded-[1.25rem] px-4 text-left text-base font-black transition duration-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-health-blue/25 ${
                    active
                      ? 'bg-health-orange text-white'
                      : 'bg-health-soft text-black hover:bg-[#e9e9ef]'
                  }`}
                >
                  <span>{option}</span>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      active ? 'bg-white/25 text-white' : 'bg-white text-health-muted'
                    }`}
                  >
                    <Check className="h-4 w-4" strokeWidth={3.2} />
                  </span>
                </button>
              );
            })}
          </div>
        </HealthCard>
      </section>

      <section className="mt-9">
        <SectionTitle
          title="Choose a class"
          description="Pick the one that matches your time and energy."
        />
        <div className="mt-4 space-y-4">
          {courses.map((course) => (
            <CourseListItem
              key={course.id}
              course={course}
              selected={course.id === selectedCourse.id}
              onClick={() => onOpenWorkout(course.id)}
            />
          ))}
        </div>
      </section>
    </ScreenFrame>
  );
}

function WorkoutDetailScreen({ course, onBack, onStart }) {
  return (
    <ScreenFrame>
      <NavHeader onBack={onBack} title="Workout" />

      <section className="mt-8">
        <h1 className="text-[3.25rem] font-black leading-[0.96] tracking-normal text-black">
          {course.title}
        </h1>

        <CourseImage
          course={course}
          className="mt-7 aspect-[4/3] w-full shadow-card"
        />

        <div className="mt-7 grid grid-cols-3 gap-3">
          <Metric icon={<Clock3 />} label="Duration" value={course.duration} />
          <Metric icon={<Wind />} label="Intensity" value={course.level} />
          <Metric icon={<Home />} label="Setup" value="Home" />
        </div>
      </section>

      <section className="mt-9">
        <SectionTitle
          title="Training goals"
          description="Enough movement to shift your energy."
        />
        <div className="mt-4 flex flex-wrap gap-3">
          {course.goals.map((goal) => (
            <span
              key={goal}
              className="rounded-full bg-white px-5 py-3 text-base font-black text-health-orange shadow-card"
            >
              {goal}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-9">
        <SectionTitle
          title="Moves in this class"
          description="A quick visual cue for each low-impact step."
        />
        <div className="mt-4 space-y-3">
          {course.moves.map((move, index) => (
            <HealthCard
              key={move.name}
              className="flex items-center gap-4 px-4 py-4"
            >
              <MoveThumbnail move={move} />
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-health-muted">
                  Move {index + 1}
                </p>
                <p className="mt-1 text-[1.15rem] font-black text-black">
                  {move.name}
                </p>
              </div>
            </HealthCard>
          ))}
        </div>
      </section>

      <HealthCard className="mt-8 p-6">
        <MetricLabel color="orange" icon={<Flame />}>
          Low impact
        </MetricLabel>
        <p className="mt-8 text-[1.65rem] font-black leading-tight text-black">
          No jumping. No equipment. Just enough movement to feel better than
          before.
        </p>
      </HealthCard>

      <div className="mt-6 pb-4">
        <PrimaryButton onClick={onStart}>
          Start Workout
          <ArrowRight className="h-5 w-5" strokeWidth={3} />
        </PrimaryButton>
      </div>
    </ScreenFrame>
  );
}

function ActiveWorkoutScreen({
  activeMove,
  activeMoveIndex,
  course,
  isPaused,
  remainingSeconds,
  tooHard,
  onBack,
  onPause,
  onTooHard,
  onSkip,
  onComplete,
}) {
  const progress =
    (remainingSeconds / course.activeMoves[activeMoveIndex].seconds) * 100;
  const time = formatTime(remainingSeconds);

  return (
    <ScreenFrame>
      <NavHeader onBack={onBack} title={activeMove.name} />

      <section className="mt-9">
        <p className="px-1 text-lg font-black uppercase text-health-muted">
          Current move
        </p>
        <HealthCard className="mt-4 p-7">
          <div className="flex items-center justify-between">
            <MetricLabel color="orange" icon={<Timer />}>
              Timer
            </MetricLabel>
            <span className="text-lg font-black text-health-muted">
              {isPaused ? 'Paused' : 'Steady'}
            </span>
          </div>

          <div className="mt-10 flex items-center justify-center">
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-health-soft">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(#ff5a1f ${progress}%, #e3e3ea ${progress}% 100%)`,
                }}
              />
              <div className="absolute inset-5 rounded-full bg-white" />
              <div className="relative text-center">
                <p className="text-[4.3rem] font-black leading-none text-black">
                  {time}
                </p>
                <p className="mt-3 text-lg font-black text-health-muted">
                  {activeMove.name}
                </p>
              </div>
            </div>
          </div>
        </HealthCard>

        <HealthCard className="mt-5 p-6">
          <p className="text-lg font-black uppercase text-health-muted">
            Coach cue
          </p>
          <p className="mt-4 text-[1.7rem] font-black leading-tight text-black">
            {activeMove.tip}
          </p>
        </HealthCard>
      </section>

      {tooHard ? (
        <div className="mt-5 rounded-[1.8rem] bg-[#fff0e8] px-5 py-4 text-base font-black leading-6 text-health-orange">
          Got it — we’ll make the next move gentler.
        </div>
      ) : null}

      <section className="mt-5 grid grid-cols-3 gap-3">
        <ActionButton onClick={onPause} icon={<Pause />}>
          {isPaused ? 'Resume' : 'Pause'}
        </ActionButton>
        <ActionButton onClick={onTooHard} icon={<Sparkles />}>
          Too hard
        </ActionButton>
        <ActionButton
          onClick={onSkip}
          icon={<RotateCcw />}
          disabled={activeMoveIndex === course.activeMoves.length - 1}
        >
          Skip
        </ActionButton>
      </section>

      <div className="mt-6 pb-4">
        <PrimaryButton onClick={onComplete}>
          Complete Workout
          <Check className="h-5 w-5" strokeWidth={3} />
        </PrimaryButton>
      </div>
    </ScreenFrame>
  );
}

function CompletionScreen({ course, feedback, onBack, onFeedback, onSavePlan }) {
  return (
    <ScreenFrame>
      <NavHeader onBack={onBack} title="Done" />

      <section className="mt-8">
        <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-[linear-gradient(145deg,#ff7a3d,#ff4d1f)] text-white shadow-card">
          <Check className="h-12 w-12" strokeWidth={3.1} />
        </div>
        <h1 className="text-[3.45rem] font-black leading-[0.98] tracking-normal text-black">
          You showed up. That counts.
        </h1>
      </section>

      <HealthCard className="mt-8 p-6">
        <MetricLabel color="orange" icon={<Flame />}>
          Summary
        </MetricLabel>
        <p className="mt-10 text-[2.55rem] font-black leading-none text-black">
          {getCourseMinutes(course.duration)}
          <span className="ml-2 text-[1.35rem] font-black text-health-muted">
            minutes completed
          </span>
        </p>
        <p className="mt-4 text-xl font-black text-health-muted">
          {course.moves.length} moves · Low impact
        </p>
      </HealthCard>

      <section className="mt-9">
        <SectionTitle
          title="How did this feel?"
          description="Your next plan will adjust from here."
        />
        <div className="mt-4 grid grid-cols-3 gap-3">
          {feedbackOptions.map((option) => {
            const active = feedback === option;
            return (
              <button
                type="button"
                key={option}
                onClick={() => onFeedback(option)}
                className={`min-h-24 rounded-[1.65rem] px-3 text-center text-base font-black transition duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-health-blue/25 ${
                  active
                    ? 'bg-health-orange text-white shadow-card'
                    : 'bg-white text-black shadow-card hover:bg-[#fbfbfd]'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </section>

      <div className="mt-8 pb-4">
        <PrimaryButton onClick={onSavePlan}>
          Save tomorrow's 10-min plan
          <ArrowRight className="h-5 w-5" strokeWidth={3} />
        </PrimaryButton>
      </div>
    </ScreenFrame>
  );
}

function ScreenFrame({ children, className = '' }) {
  return (
    <div className={`flex min-h-full flex-col px-6 pb-8 pt-4 ${className}`}>
      {children}
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex h-12 shrink-0 items-center justify-between px-10 pt-3 text-black">
      <span className="text-xl font-black leading-none">9:41</span>
      <div className="flex items-center gap-2.5">
        <div className="flex h-5 items-end gap-1">
          {[8, 11, 15, 19].map((height) => (
            <span
              key={height}
              className="w-1.5 rounded-sm bg-black"
              style={{ height }}
            />
          ))}
        </div>
        <div className="relative h-5 w-6">
          <span className="absolute left-0 top-1 h-4 w-6 rounded-t-full border-[3px] border-b-0 border-black" />
          <span className="absolute left-[7px] top-[9px] h-2.5 w-2.5 rounded-full bg-black" />
        </div>
        <div className="flex h-5 w-8 items-center rounded-md border-[2.5px] border-black p-0.5">
          <span className="h-full flex-1 rounded-sm bg-black" />
        </div>
      </div>
    </div>
  );
}

function AppHeader({ onBack, title, showAvatar = false }) {
  return (
    <header>
      <div className="flex items-center justify-between pt-3">
        <CircleButton onClick={onBack} ariaLabel="Go back">
          <ChevronLeft className="h-8 w-8" strokeWidth={3} />
        </CircleButton>
        {showAvatar ? <Avatar /> : null}
      </div>
      <h1 className="mt-10 text-[3.8rem] font-black leading-none tracking-normal text-black">
        {title}
      </h1>
    </header>
  );
}

function NavHeader({ onBack, title }) {
  return (
    <header className="relative flex h-24 items-center justify-center pt-3">
      <div className="absolute left-0 top-3">
        <CircleButton onClick={onBack} ariaLabel="Go back">
          <ChevronLeft className="h-8 w-8" strokeWidth={3} />
        </CircleButton>
      </div>
      <h1 className="text-[1.65rem] font-black text-black">{title}</h1>
    </header>
  );
}

function CircleButton({ children, onClick, ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex h-[4.35rem] w-[4.35rem] items-center justify-center rounded-full bg-white text-black shadow-circle transition duration-200 hover:scale-[1.03] active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-health-blue/25"
    >
      {children}
    </button>
  );
}

function Avatar() {
  return (
    <div className="flex h-[4.35rem] w-[4.35rem] items-center justify-center rounded-full bg-[linear-gradient(145deg,#b9d1ff,#6675ca)] text-[1.55rem] font-black text-white shadow-card">
      MN
    </div>
  );
}

function HealthCard({ children, className = '' }) {
  return (
    <div className={`rounded-[2rem] bg-white shadow-card ${className}`}>
      {children}
    </div>
  );
}

function CourseListItem({ course, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group block w-full text-left outline-none"
    >
        <HealthCard
          className={`overflow-hidden transition duration-200 group-hover:-translate-y-0.5 group-active:scale-[0.99] ${
            selected ? 'ring-2 ring-health-orange' : ''
          }`}
        >
          <CourseImage
            course={course}
            className="aspect-[16/9] w-full"
            flush
          />
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-health-orange">
                {course.duration} · {course.level}
              </p>
              <h3 className="mt-2 text-[1.35rem] font-black leading-7 text-black">
                {course.title}
              </h3>
              <p className="mt-2 text-base font-semibold leading-6 text-health-muted">
                {course.goals.join(' / ')}
              </p>
            </div>
            <ChevronRight className="mt-2 h-7 w-7 shrink-0 text-health-chevron" />
          </div>
        </div>
      </HealthCard>
    </button>
  );
}

function CourseImage({ course, className = '', flush = false }) {
  return (
    <div
      className={`overflow-hidden bg-white ${
        flush ? 'rounded-none' : 'rounded-[1.55rem]'
      } ${className}`}
    >
      <img
        src={course.image}
        alt={course.imageAlt}
        className="h-full w-full object-cover object-center"
        style={{
          objectPosition: course.imagePosition,
          transform:
            flush && course.listImageScale
              ? `scale(${course.listImageScale})`
              : undefined,
        }}
      />
    </div>
  );
}

function MoveThumbnail({ move }) {
  return (
    <div
      className="flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center overflow-hidden rounded-[1.35rem] bg-white shadow-card"
    >
      <img
        src={move.image}
        alt={`${move.name} illustration`}
        className="h-full w-full object-cover object-center"
      />
    </div>
  );
}

function SectionTitle({ title, description }) {
  return (
    <div className="px-5">
      <h2 className="text-[1.85rem] font-black leading-tight text-black">
        {title}
      </h2>
      <p className="mt-2 text-lg font-semibold leading-7 text-health-muted">
        {description}
      </p>
    </div>
  );
}

function Metric({ icon, label, value }) {
  return (
    <HealthCard className="px-2 py-5 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-health-soft text-health-orange [&_svg]:h-6 [&_svg]:w-6 [&_svg]:stroke-[2.8]">
        {icon}
      </div>
      <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-health-muted">
        {label}
      </p>
      <p className="mt-2 text-base font-black text-black">{value}</p>
    </HealthCard>
  );
}

function MetricLabel({ children, icon, color }) {
  const colorClass = color === 'blue' ? 'text-health-blue' : 'text-health-orange';

  return (
    <div
      className={`flex items-center gap-2 text-[1.25rem] font-black ${colorClass} [&_svg]:h-6 [&_svg]:w-6 [&_svg]:fill-current [&_svg]:stroke-[2.8]`}
    >
      {icon}
      <span>{children}</span>
    </div>
  );
}

function IconBubble({ children, color }) {
  const colorClass =
    color === 'blue'
      ? 'bg-[#e6f0ff] text-health-blue'
      : 'bg-[#fff0e8] text-health-orange';

  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] ${colorClass}`}
    >
      {children}
    </span>
  );
}

function MiniBars() {
  return (
    <div className="flex h-24 items-end gap-2">
      {[28, 58, 38, 76].map((height, index) => (
        <span
          key={height}
          className={`w-4 rounded-full ${
            index === 3 ? 'bg-health-orange' : 'bg-[#e4e4eb]'
          }`}
          style={{ height }}
        />
      ))}
    </div>
  );
}

function PrimaryButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-16 w-full items-center justify-center gap-2 rounded-full bg-[#ff5a1f] px-6 py-4 text-lg font-black text-white shadow-card transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5a1f] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-health-orange/25"
    >
      {children}
    </button>
  );
}

function ActionButton({ children, icon, onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex min-h-[5.4rem] flex-col items-center justify-center gap-2 rounded-[1.5rem] bg-white px-2 py-3 text-center text-sm font-black text-black shadow-card transition duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-health-blue/25 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:stroke-[3]"
    >
      <span className="text-health-orange">{icon}</span>
      {children}
    </button>
  );
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const rest = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${rest}`;
}

function getCourseMinutes(duration) {
  return duration.replace(/\s*min$/i, '');
}

export default App;
