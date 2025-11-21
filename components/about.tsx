"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  Coffee,
  Book,
  Plus,
  X,
  Settings,
  Calendar,
  Building,
  User,
  Trophy,
  Star,
  Lightbulb,
  Target,
  Rocket,
  Shield,
  Sparkles,
  Code,
  Database,
  Palette,
  Megaphone,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Brain,
  Cpu,
  Layers,
  Package,
  Server,
  Smartphone,
  Monitor,
  Wifi,
  Cloud,
  Lock,
  Key,
  Eye,
  Search,
  Filter,
  Edit,
  FileText,
  FolderOpen,
  GitBranch,
  Hash,
  Inbox,
  Send,
  MessageSquare,
  Music,
  Camera,
  Video,
  Mic,
  Volume2,
  Headphones,
  Radio,
  Zap,
  Globe,
  Users,
  TrendingUp,
  BookOpen,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Home,
  School,
} from "lucide-react"
import { EditableText } from "@/components/editable/editable-text"
import { EditableMedia } from "@/components/editable/editable-media"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"
import { COMMON_STYLES } from "@/lib/constants"

// 사용 가능한 아이콘들 - 경험 카드용
const AVAILABLE_ICONS = {
  briefcase: Briefcase,
  graduation: GraduationCap,
  award: Award,
  trophy: Trophy,
  star: Star,
  lightbulb: Lightbulb,
  target: Target,
  rocket: Rocket,
  shield: Shield,
  building: Building,
  calendar: Calendar,
  book: Book,
  heart: Heart,
  coffee: Coffee,
  user: User,
  zap: Zap,
  globe: Globe,
  users: Users,
  trending: TrendingUp,
  bookOpen: BookOpen,
  mapPin: MapPin,
  clock: Clock,
  check: CheckCircle,
  alert: AlertCircle,
  home: Home,
  school: School,
}

// 사용 가능한 아이콘들 - 스킬용
const SKILL_ICONS = {
  trophy: Trophy,
  sparkles: Sparkles,
  target: Target,
  rocket: Rocket,
  star: Star,
  zap: Zap,
  lightbulb: Lightbulb,
  brain: Brain,
  code: Code,
  database: Database,
  palette: Palette,
  megaphone: Megaphone,
  barChart: BarChart3,
  lineChart: LineChart,
  pieChart: PieChart,
  activity: Activity,
  cpu: Cpu,
  layers: Layers,
  package: Package,
  server: Server,
  smartphone: Smartphone,
  monitor: Monitor,
  wifi: Wifi,
  cloud: Cloud,
  lock: Lock,
  key: Key,
  eye: Eye,
  search: Search,
  filter: Filter,
  edit: Edit,
  fileText: FileText,
  folderOpen: FolderOpen,
  gitBranch: GitBranch,
  hash: Hash,
  inbox: Inbox,
  send: Send,
  messageSquare: MessageSquare,
  music: Music,
  camera: Camera,
  video: Video,
  mic: Mic,
  volume: Volume2,
  headphones: Headphones,
  radio: Radio,
  heart: Heart,
  shield: Shield,
  globe: Globe,
  users: Users,
}

export function About() {
  const { getData, saveData, isEditMode, saveToFile } = useInlineEditor()

  // 기본 데이터
  const defaultInfo = {
    title: "소개",
    subtitle: "당신의 전문성과 열정을 소개해주세요.",
    background: { image: "", video: "", color: "", opacity: 0.1 },

    experienceCards: [
      {
        icon: "graduation",
        title: "단국대학교 죽전캠퍼스",
        period: "2021 - 2027.02(졸업 예정)",
        description: "도시계획부동산학부",
      },
      {
        icon: "graduation",
        title: "학교명",
        period: "2016 - 2020",
        description: "전공 및 학위",
      },
      {
        icon: "award",
        title: "자격증/수상",
        period: "2021",
        description: "설명을 입력하세요",
      },
      {
        icon: "briefcase",
        title: "새 경험",
        period: "2024",
        description: "설명을 입력하세요",
      },
    ],

    skills: [
      {
        icon: "code",
        title: "프론트엔드 개발",
        description: "React, TypeScript, Next.js를 활용한 모던 웹 개발",
      },
      {
        icon: "database",
        title: "백엔드 개발",
        description: "Node.js, Python, 데이터베이스 설계 및 구현",
      },
      {
        icon: "palette",
        title: "UI/UX 디자인",
        description: "사용자 중심의 인터페이스 디자인",
      },
    ],

    storyTitle: "나의 이야기",
    story: [
      "저는 기술을 통해 사람들의 삶을 더 편리하고 의미 있게 만드는 일에 열정을 가지고 있습니다.\n",
      "다양한 프로젝트를 통해 문제 해결 능력과 창의적인 사고를 키워왔으며, 팀원들과의 협업을 통해 함께 성장하는 가치를 배웠습니다.",
      "앞으로도 지속적인 학습과 도전을 통해 더 나은 개발자가 되기 위해 노력하겠습니다.",
    ],
    storyImage: "",

    hobbies: ["📚 독서", "☕ 카페 투어", "🎨 전시회 관람", "✈️ 여행"],

    // Projects 기본값 (표지 이미지 + PDF 이름 포함)
    projects: [
      {
        title: "서울시 고덕동 아파트 가격 분석",
        period: "2023.09 ~ 2023.12",
        description:
          "국토부 실거래가 데이터를 활용하여 고덕동 주요 단지 가격 변동과 개발 호재(9호선 연장, 비즈밸리 등)를 분석한 리포트.",
        tags: ["#실거래가", "#아파트분석", "#도시계획"],
        coverImage: "",
        pdfName: "",
        linkLabel: "리포트 보기",
        linkUrl: "",
      },
      {
        title: "한국·일본 주택시장 및 고령사회 정책 비교",
        period: "2024.03 ~ 2024.06",
        description:
          "한국과 일본의 고령자 주거정책, 빈집 문제, 농촌 활성화 정책을 비교·분석한 발표 과제.",
        tags: ["#고령사회", "#빈집", "#정책비교"],
        coverImage: "",
        pdfName: "",
        linkLabel: "발표 자료 보기",
        linkUrl: "",
      },
    ],

    // 이력서 기본값
    resume: {
      personal: [
        { label: "이름", value: "김민수" },
        { label: "주소", value: "경기 용인시 수지구 죽전동" },
        { label: "휴대전화", value: "010-0000-0000" },
        { label: "Email", value: "example@naver.com" },
      ],
      education: [
        {
          period: "2018.03 ~ 2021.02",
          type: "고등학교",
          name: "OO고등학교",
          major: "인문계열",
        },
        {
          period: "2021.03 ~ 현재",
          type: "대학교",
          name: "단국대학교 죽전캠퍼스",
          major: "도시계획부동산학부",
        },
      ],
      certificates: [
        {
          date: "2024.01.03",
          name: "예: 공인중개사 (또는 관심 있는 자격증)",
        },
      ],
      activities: [
        {
          period: "2023.03 ~ 현재",
          title: "아이사랑 동아리 교육부장",
          details: [
            "아동 대상 교육 봉사 기획 및 운영",
            "부원 간 소통 및 활동 일정 조율",
          ],
        },
        {
          period: "2024.03 ~ 2024.06",
          title: "도시·부동산 관련 학회/프로젝트",
          details: [
            "도시재생·주택시장 리포트 작성",
            "팀 단위 프로젝트 수행",
          ],
        },
      ],
    },
  }

  const [aboutInfo, setAboutInfo] = useState(defaultInfo)
  const [backgroundData, setBackgroundData] = useState(defaultInfo.background)
  const [showCareerModal, setShowCareerModal] = useState(false)
  const [showSkillModal, setShowSkillModal] = useState(false)
  const [showHobbyModal, setShowHobbyModal] = useState(false)

  // PDF는 localStorage에 저장하지 않고, 이 state에만 보관
  const [projectPdfs, setProjectPdfs] = useState<{
    [key: number]: { pdfName: string; pdfDataUrl: string }
  }>({})

  // localStorage에서 데이터 로드 - 편집 모드가 변경될 때마다 실행
  useEffect(() => {
    const savedData = getData("about-info") as any | null
    if (savedData) {
      const merged = { ...defaultInfo, ...savedData }
      setAboutInfo(merged)
      if (savedData.background) {
        setBackgroundData(savedData.background)
      }
    }

    const savedBg = getData("about-background") as
      | { image: string; video: string; color: string; opacity: number }
      | null
    if (savedBg) {
      setBackgroundData(savedBg)
    }
  }, [isEditMode])

  const updateAboutInfo = (key: string, value: any) => {
    const newInfo = { ...aboutInfo, [key]: value }
    setAboutInfo(newInfo)
    saveData("about-info", newInfo)
  }

  const updateExperienceCard = (index: number, field: string, value: string) => {
    const newCards = [...aboutInfo.experienceCards]
    newCards[index] = { ...newCards[index], [field]: value }
    updateAboutInfo("experienceCards", newCards)
  }

  const addExperienceCard = () => {
    updateAboutInfo("experienceCards", [
      ...aboutInfo.experienceCards,
      {
        icon: "briefcase",
        title: "새 경험",
        period: "2024",
        description: "설명을 입력하세요",
      },
    ])
  }

  const removeExperienceCard = (index: number) => {
    updateAboutInfo(
      "experienceCards",
      aboutInfo.experienceCards.filter((_, i) => i !== index),
    )
  }

  const updateSkill = (index: number, field: string, value: string) => {
    const newSkills = [...aboutInfo.skills]
    newSkills[index] = { ...newSkills[index], [field]: value }
    updateAboutInfo("skills", newSkills)
  }

  const addSkill = () => {
    updateAboutInfo("skills", [
      ...aboutInfo.skills,
      { icon: "star", title: "새 스킬", description: "스킬 설명" },
    ])
  }

  const removeSkill = (index: number) => {
    updateAboutInfo(
      "skills",
      aboutInfo.skills.filter((_, i) => i !== index),
    )
  }

  const updateStory = (index: number, value: string) => {
    const newStory = [...aboutInfo.story]
    newStory[index] = value
    updateAboutInfo("story", newStory)
  }

  const addStory = () => {
    updateAboutInfo("story", [...aboutInfo.story, "새로운 문단"])
  }

  const removeStory = (index: number) => {
    updateAboutInfo(
      "story",
      aboutInfo.story.filter((_, i) => i !== index),
    )
  }

  const updateHobby = (index: number, value: string) => {
    const newHobbies = [...aboutInfo.hobbies]
    newHobbies[index] = value
    updateAboutInfo("hobbies", newHobbies)
  }

  const addHobby = () => {
    updateAboutInfo("hobbies", [...aboutInfo.hobbies, "🎯 새 취미"])
  }

  const removeHobby = (index: number) => {
    updateAboutInfo(
      "hobbies",
      aboutInfo.hobbies.filter((_, i) => i !== index),
    )
  }

  // Projects 관련
  const updateProject = (index: number, field: string, value: any) => {
    const newProjects = [...aboutInfo.projects]
    newProjects[index] = { ...aboutInfo.projects[index], [field]: value }
    updateAboutInfo("projects", newProjects)
  }

  const addProject = () => {
    const newProjects = [
      ...aboutInfo.projects,
      {
        title: "새 프로젝트",
        period: "2024",
        description: "프로젝트 설명을 입력하세요.",
        tags: ["#프로젝트"],
        coverImage: "",
        pdfName: "",
        linkLabel: "자료 보기",
        linkUrl: "",
      },
    ]
    updateAboutInfo("projects", newProjects)
  }

  const removeProject = (index: number) => {
    updateAboutInfo(
      "projects",
      aboutInfo.projects.filter((_, i) => i !== index),
    )
    setProjectPdfs((prev) => {
      const copy = { ...prev }
      delete copy[index]
      return copy
    })
  }

  const updateProjectTag = (index: number, tagsString: string) => {
    const tags = tagsString
      .split(" ")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
    const newProjects = [...aboutInfo.projects]
    newProjects[index] = { ...aboutInfo.projects[index], tags }
    updateAboutInfo("projects", newProjects)
  }

  // PDF 업로드 (localStorage에는 PDF 내용 저장 안 함)
  const handleProjectPdfUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== "application/pdf") {
      alert("PDF 파일만 업로드할 수 있습니다.")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setProjectPdfs((prev) => ({
        ...prev,
        [index]: { pdfName: file.name, pdfDataUrl: result },
      }))
      // 파일 이름만 aboutInfo에 저장 (용량 거의 없음)
      updateProject(index, "pdfName", file.name)
    }
    reader.readAsDataURL(file)
  }

  // Resume 관련
  const updateResumeItem = (
    section: "personal" | "education" | "certificates" | "activities",
    index: number,
    field: string,
    value: string,
  ) => {
    const newResume = { ...aboutInfo.resume } as any
    const newSection = [...(newResume[section] as any[])]

    if (section === "activities" && field.startsWith("detail-")) {
      const detailIndex = Number(field.split("-")[1])
      const details = [...(newSection[index].details || [])]
      details[detailIndex] = value
      newSection[index] = { ...newSection[index], details }
    } else {
      newSection[index] = { ...newSection[index], [field]: value }
    }

    newResume[section] = newSection
    updateAboutInfo("resume", newResume)
  }

  return (
    <EditableBackground
      image={backgroundData.image}
      video={backgroundData.video}
      color={backgroundData.color}
      opacity={backgroundData.opacity}
      onChange={(data) => {
        const newData = { ...backgroundData, ...data }
        setBackgroundData(newData)
        saveData("about-background", newData)

        // aboutInfo도 업데이트 (파일 저장을 위해)
        const updatedAboutInfo = { ...aboutInfo, background: newData }
        setAboutInfo(updatedAboutInfo)
        saveData("about-info", updatedAboutInfo)
      }}
      storageKey="about-background"
      className="py-20 bg-muted/30 relative"
    >
      <section id="about" className="w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 섹션 제목 */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              <EditableText
                value={aboutInfo.title}
                onChange={(value) => updateAboutInfo("title", value)}
                storageKey="about-title"
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <EditableText
                value={aboutInfo.subtitle}
                onChange={(value) => updateAboutInfo("subtitle", value)}
                storageKey="about-subtitle"
                multiline
              />
            </p>
          </div>

          {/* 경험 카드 (경력/학력/자격증 등) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {aboutInfo.experienceCards?.map((card, index) => {
              const Icon =
                AVAILABLE_ICONS[card.icon as keyof typeof AVAILABLE_ICONS] ||
                Briefcase
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative"
                >
                  <CardContent className="p-6">
                    {isEditMode && (
                      <button
                        onClick={() => removeExperienceCard(index)}
                        className={COMMON_STYLES.deleteButton}
                      >
                        <X className={COMMON_STYLES.deleteIcon} />
                      </button>
                    )}
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          <EditableText
                            value={card.title}
                            onChange={(value) =>
                              updateExperienceCard(index, "title", value)
                            }
                            storageKey={`about-experience-${index}-title`}
                          />
                        </h3>
                        <p className="text-sm text-primary mb-2">
                          <EditableText
                            value={card.period}
                            onChange={(value) =>
                              updateExperienceCard(index, "period", value)
                            }
                            storageKey={`about-experience-${index}-period`}
                          />
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <EditableText
                            value={card.description}
                            onChange={(value) =>
                              updateExperienceCard(
                                index,
                                "description",
                                value,
                              )
                            }
                            storageKey={`about-experience-${index}-description`}
                          />
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {isEditMode && (
              <Card
                className="border-2 border-dashed border-muted-foreground/30 shadow-none hover:border-primary transition-all cursor-pointer"
                onClick={() => setShowCareerModal(true)}
              >
                <CardContent className="p-6 flex items-center justify-center">
                  <div className="text-center">
                    <Settings className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      경험 카드 편집
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* 핵심 역량 */}
          {(aboutInfo.skills.length > 0 || isEditMode) && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                핵심 역량
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {aboutInfo.skills.map((skill, index) => {
                  const Icon =
                    SKILL_ICONS[skill.icon as keyof typeof SKILL_ICONS] ||
                    Trophy
                  return (
                    <div key={index} className="text-center relative">
                      {isEditMode && (
                        <button
                          onClick={() => removeSkill(index)}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">
                        <EditableText
                          value={skill.title}
                          onChange={(value) =>
                            updateSkill(index, "title", value)
                          }
                          storageKey={`about-skill-${index}-title`}
                        />
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        <EditableText
                          value={skill.description}
                          onChange={(value) =>
                            updateSkill(index, "description", value)
                          }
                          storageKey={`about-skill-${index}-description`}
                          multiline
                        />
                      </p>
                    </div>
                  )
                })}
                {isEditMode && (
                  <div
                    className="text-center border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 flex items-center justify-center cursor-pointer hover:border-primary transition-all"
                    onClick={() => setShowSkillModal(true)}
                  >
                    <div>
                      <Settings className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">스킬 편집</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 자기소개 상세 */}
          {(aboutInfo.story.length > 0 || isEditMode) && (
            <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    <EditableText
                      value={aboutInfo.storyTitle}
                      onChange={(value) =>
                        updateAboutInfo("storyTitle", value)
                      }
                      storageKey="about-storyTitle"
                    />
                  </h3>
                  {aboutInfo.story.map((paragraph, index) => (
                    <div key={index} className="relative mb-4">
                      {isEditMode && (
                        <button
                          onClick={() => removeStory(index)}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}
                      <p className="text-muted-foreground leading-relaxed">
                        <EditableText
                          value={paragraph}
                          onChange={(value) => updateStory(index, value)}
                          storageKey={`about-story-${index}`}
                          multiline
                        />
                      </p>
                    </div>
                  ))}
                  {isEditMode && (
                    <button
                      onClick={addStory}
                      className="mt-2 px-4 py-2 border border-dashed border-muted-foreground/30 rounded-lg hover:border-primary transition-all"
                    >
                      <Plus className="h-4 w-4 inline mr-2" />
                      문단 추가
                    </button>
                  )}
                </div>

                {/* 이미지 영역 */}
                <div className="relative w-full h-full min-h-[500px] lg:min-h-full">
                  <EditableMedia
                    src={aboutInfo.storyImage}
                    onChange={(src) => updateAboutInfo("storyImage", src)}
                    type="image"
                    storageKey="about-storyImage"
                    className="w-full h-full object-cover"
                    alt="소개 이미지"
                    purpose="about-image"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 취미 & 관심사 */}
          {(aboutInfo.hobbies.length > 0 || isEditMode) && (
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-8">
                취미 & 관심사
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {aboutInfo.hobbies.map((hobby, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm relative group flex items-center justify-center"
                  >
                    {isEditMode && (
                      <button
                        onClick={() => removeHobby(index)}
                        className={`${COMMON_STYLES.deleteButton} opacity-0 group-hover:opacity-100 transition-opacity`}
                      >
                        <X className={COMMON_STYLES.deleteIcon} />
                      </button>
                    )}
                    <EditableText
                      value={hobby}
                      onChange={(value) => updateHobby(index, value)}
                      storageKey={`about-hobby-${index}`}
                    />
                  </span>
                ))}
                {isEditMode && (
                  <button
                    onClick={() => setShowHobbyModal(true)}
                    className="px-4 py-2 border border-dashed border-muted-foreground/30 rounded-full text-sm hover:border-primary transition-all"
                  >
                    <Settings className="h-4 w-4 inline mr-1" />
                    편집
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Projects 섹션 */}
          {(aboutInfo.projects.length > 0 || isEditMode) && (
            <div className="mt-20">
              <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
                Projects
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-8">
                수업·과제·개인 프로젝트 중 보여주고 싶은 작업들을 정리해 보세요.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aboutInfo.projects.map((project: any, index: number) => (
                  <Card
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative"
                  >
                    <CardContent className="p-6 space-y-3">
                      {isEditMode && (
                        <button
                          onClick={() => removeProject(index)}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}

                      {/* 표지 이미지 */}
                      {(project.coverImage || isEditMode) && (
                        <div className="mb-3">
                          <EditableMedia
                            src={project.coverImage}
                            onChange={(src) =>
                              updateProject(index, "coverImage", src)
                            }
                            type="image"
                            storageKey={`about-project-${index}-cover`}
                            className="w-full h-40 object-cover rounded-lg"
                            alt="프로젝트 표지"
                            purpose="project-cover"
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <FolderOpen className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold text-lg text-foreground">
                          <EditableText
                            value={project.title}
                            onChange={(value) =>
                              updateProject(index, "title", value)
                            }
                            storageKey={`about-project-${index}-title`}
                          />
                        </h4>
                      </div>

                      <p className="text-sm text-primary">
                        <EditableText
                          value={project.period}
                          onChange={(value) =>
                            updateProject(index, "period", value)
                          }
                          storageKey={`about-project-${index}-period`}
                        />
                      </p>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <EditableText
                          value={project.description}
                          onChange={(value) =>
                            updateProject(index, "description", value)
                          }
                          storageKey={`about-project-${index}-description`}
                          multiline
                        />
                      </p>

                      {/* 태그 */}
                      <div className="flex flex-wrap gap-2">
                        {(project.tags || []).map((tag: string, i: number) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {isEditMode && (
                        <div className="mt-1 text-left">
                          <p className="text-xs text-muted-foreground mb-1">
                            태그를 공백으로 구분해서 입력하세요. 예: #실거래가
                            #도시재생
                          </p>
                          <EditableText
                            value={(project.tags || []).join(" ")}
                            onChange={(value) => updateProjectTag(index, value)}
                            storageKey={`about-project-${index}-tags`}
                          />
                        </div>
                      )}

                      {/* PDF 업로드 + 보기 */}
                      <div className="pt-2 space-y-1">
                        {isEditMode && (
                          <div className="text-xs text-muted-foreground space-y-1">
                            <label className="block">
                              📄 PDF 업로드
                              <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) =>
                                  handleProjectPdfUpload(e, index)
                                }
                                className="mt-1 block w-full text-xs"
                              />
                            </label>
                            <p>
                              ※ PDF는 브라우저 메모리에만 저장되며, 새로고침하면
                              초기화됩니다.
                            </p>
                          </div>
                        )}

                        {projectPdfs[index]?.pdfDataUrl ? (
                          <a
                            href={projectPdfs[index].pdfDataUrl}
                            download={
                              projectPdfs[index].pdfName ||
                              project.pdfName ||
                              "project.pdf"
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center text-sm text-primary hover:underline"
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            업로드한 PDF 열기
                          </a>
                        ) : project.pdfName ? (
                          <p className="text-xs text-muted-foreground">
                            업로드된 PDF: {project.pdfName} (이 브라우저
                            세션에서만 열 수 있습니다)
                          </p>
                        ) : null}
                      </div>

                      {/* 링크 버튼 */}
                      {(project.linkUrl || isEditMode) && (
                        <div className="pt-2">
                          <a
                            href={project.linkUrl || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center text-sm font-medium ${
                              project.linkUrl
                                ? "text-primary hover:underline"
                                : "text-muted-foreground cursor-default"
                            }`}
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            <EditableText
                              value={project.linkLabel || "자료 보기"}
                              onChange={(value) =>
                                updateProject(index, "linkLabel", value)
                              }
                              storageKey={`about-project-${index}-linkLabel`}
                            />
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {isEditMode && (
                  <Card
                    className="border-2 border-dashed border-muted-foreground/30 shadow-none hover:border-primary transition-all cursor-pointer"
                    onClick={addProject}
                  >
                    <CardContent className="p-6 flex items-center justify-center">
                      <div className="text-center">
                        <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          프로젝트 추가
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* 이력서 섹션 */}
          {aboutInfo.resume && (
            <div className="mt-20">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                이력서
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* 인적사항 */}
                <div>
                  <h4 className="text-xl font-semibold mb-4">인적사항</h4>
                  <div className="space-y-2 text-sm">
                    {aboutInfo.resume.personal.map(
                      (item: any, index: number) => (
                        <div
                          key={index}
                          className="grid grid-cols-3 gap-2 items-center"
                        >
                          <span className="font-medium text-muted-foreground">
                            <EditableText
                              value={item.label}
                              onChange={(value) =>
                                updateResumeItem(
                                  "personal",
                                  index,
                                  "label",
                                  value,
                                )
                              }
                              storageKey={`resume-personal-${index}-label`}
                            />
                          </span>
                          <span className="col-span-2">
                            <EditableText
                              value={item.value}
                              onChange={(value) =>
                                updateResumeItem(
                                  "personal",
                                  index,
                                  "value",
                                  value,
                                )
                              }
                              storageKey={`resume-personal-${index}-value`}
                            />
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* 학력사항 */}
                <div>
                  <h4 className="text-xl font-semibold mb-4">학력사항</h4>
                  <div className="space-y-3 text-sm">
                    {aboutInfo.resume.education.map(
                      (edu: any, index: number) => (
                        <div
                          key={index}
                          className="border rounded-lg p-3 bg-muted/30"
                        >
                          <p className="text-primary text-xs mb-1">
                            <EditableText
                              value={edu.period}
                              onChange={(value) =>
                                updateResumeItem(
                                  "education",
                                  index,
                                  "period",
                                  value,
                                )
                              }
                              storageKey={`resume-education-${index}-period`}
                            />
                          </p>
                          <p className="font-medium">
                            <EditableText
                              value={edu.name}
                              onChange={(value) =>
                                updateResumeItem(
                                  "education",
                                  index,
                                  "name",
                                  value,
                                )
                              }
                              storageKey={`resume-education-${index}-name`}
                            />
                          </p>
                          <p className="text-muted-foreground">
                            <EditableText
                              value={edu.major}
                              onChange={(value) =>
                                updateResumeItem(
                                  "education",
                                  index,
                                  "major",
                                  value,
                                )
                              }
                              storageKey={`resume-education-${index}-major`}
                            />
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* 자격 & 활동 */}
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* 자격사항 */}
                <div>
                  <h4 className="text-xl font-semibold mb-4">자격사항</h4>
                  <div className="space-y-2 text-sm">
                    {aboutInfo.resume.certificates.map(
                      (cert: any, index: number) => (
                        <div key={index} className="flex items-center gap-3">
                          <span className="text-xs text-primary w-24">
                            <EditableText
                              value={cert.date}
                              onChange={(value) =>
                                updateResumeItem(
                                  "certificates",
                                  index,
                                  "date",
                                  value,
                                )
                              }
                              storageKey={`resume-cert-${index}-date`}
                            />
                          </span>
                          <span className="flex-1">
                            <EditableText
                              value={cert.name}
                              onChange={(value) =>
                                updateResumeItem(
                                  "certificates",
                                  index,
                                  "name",
                                  value,
                                )
                              }
                              storageKey={`resume-cert-${index}-name`}
                            />
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* 활동사항 */}
                <div>
                  <h4 className="text-xl font-semibold mb-4">활동사항</h4>
                  <div className="space-y-3 text-sm">
                    {aboutInfo.resume.activities.map(
                      (act: any, index: number) => (
                        <div
                          key={index}
                          className="border rounded-lg p-3 bg-muted/30"
                        >
                          <p className="text-primary text-xs mb-1">
                            <EditableText
                              value={act.period}
                              onChange={(value) =>
                                updateResumeItem(
                                  "activities",
                                  index,
                                  "period",
                                  value,
                                )
                              }
                              storageKey={`resume-activity-${index}-period`}
                            />
                          </p>
                          <p className="font-medium mb-1">
                            <EditableText
                              value={act.title}
                              onChange={(value) =>
                                updateResumeItem(
                                  "activities",
                                  index,
                                  "title",
                                  value,
                                )
                              }
                              storageKey={`resume-activity-${index}-title`}
                            />
                          </p>
                          <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            {(act.details || []).map(
                              (detail: string, i: number) => (
                                <li key={i}>
                                  <EditableText
                                    value={detail}
                                    onChange={(value) =>
                                      updateResumeItem(
                                        "activities",
                                        index,
                                        `detail-${i}`,
                                        value,
                                      )
                                    }
                                    storageKey={`resume-activity-${index}-detail-${i}`}
                                    multiline
                                  />
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 경험 카드 편집 모달 */}
      {showCareerModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-background border rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">경험 카드 편집</h3>
              <button
                onClick={() => setShowCareerModal(false)}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {aboutInfo.experienceCards?.map((card, index) => {
                const Icon =
                  AVAILABLE_ICONS[card.icon as keyof typeof AVAILABLE_ICONS] ||
                  Briefcase
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 border rounded-lg bg-muted/30"
                  >
                    <select
                      value={card.icon}
                      onChange={(e) =>
                        updateExperienceCard(index, "icon", e.target.value)
                      }
                      className="w-40 px-2 py-2 border rounded-lg bg-background"
                    >
                      <option value="briefcase">💼 직장</option>
                      <option value="graduation">🎓 학교</option>
                      <option value="award">🏆 수상</option>
                      <option value="trophy">🏅 성과</option>
                      <option value="star">⭐ 우수</option>
                      <option value="lightbulb">💡 아이디어</option>
                      <option value="target">🎯 목표</option>
                      <option value="rocket">🚀 시작</option>
                      <option value="shield">🛡️ 보안</option>
                      <option value="building">🏢 회사</option>
                      <option value="calendar">📅 기간</option>
                      <option value="book">📚 교육</option>
                      <option value="heart">❤️ 열정</option>
                      <option value="coffee">☕ 일상</option>
                      <option value="user">👤 개인</option>
                    </select>

                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) =>
                          updateExperienceCard(index, "title", e.target.value)
                        }
                        placeholder="예: ABC 회사, 서울대학교, 구글 자격증"
                        className="w-full px-3 py-2 border rounded-lg bg-background font-semibold"
                      />

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={card.period}
                          onChange={(e) =>
                            updateExperienceCard(
                              index,
                              "period",
                              e.target.value,
                            )
                          }
                          placeholder="예: 2020 - 현재"
                          className="flex-1 px-3 py-2 border rounded-lg bg-background"
                        />

                        <input
                          type="text"
                          value={card.description}
                          onChange={(e) =>
                            updateExperienceCard(
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                          placeholder="예: 마케팅 매니저, 경영학 학사, GAIQ 인증"
                          className="flex-1 px-3 py-2 border rounded-lg bg-background"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => removeExperienceCard(index)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}

              <button
                onClick={addExperienceCard}
                className="w-full py-3 border-2 border-dashed rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                카드 추가
              </button>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCareerModal(false)}
                  className="flex-1 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80"
                >
                  닫기
                </button>
                <button
                  onClick={async () => {
                    const success = await saveToFile("about", "Info", aboutInfo)
                    if (success) {
                      alert("✅ 소개 설정이 파일에 저장되었습니다!")
                      setShowCareerModal(false)
                    } else {
                      alert("❌ 파일 저장에 실패했습니다.")
                    }
                  }}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
                >
                  📁 파일에 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 스킬 편집 모달 */}
      {showSkillModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2147483647]">
          <div className="bg-background border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">핵심 역량 편집</h3>
              <button
                onClick={() => setShowSkillModal(false)}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {aboutInfo.skills.map((skill, index) => {
                const Icon =
                  SKILL_ICONS[skill.icon as keyof typeof SKILL_ICONS] ||
                  Trophy
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 border rounded-lg bg-muted/30"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <select
                        value={skill.icon}
                        onChange={(e) =>
                          updateSkill(index, "icon", e.target.value)
                        }
                        className="w-32 px-2 py-1 text-xs border rounded-lg bg-background"
                      >
                        <optgroup label="기술 스킬">
                          <option value="code">💻 코드/개발</option>
                          <option value="database">🗜️ 데이터베이스</option>
                          <option value="server">🌐 서버/클라우드</option>
                          <option value="smartphone">📱 모바일</option>
                          <option value="monitor">🖥️ 프론트엔드</option>
                          <option value="cpu">🤖 AI/ML</option>
                          <option value="gitBranch">🌿 Git/버전관리</option>
                          <option value="lock">🔒 보안</option>
                        </optgroup>
                        <optgroup label="비즈니스">
                          <option value="barChart">📊 데이터 분석</option>
                          <option value="lineChart">📈 성과 분석</option>
                          <option value="pieChart">🥧 통계/시각화</option>
                          <option value="megaphone">📢 마케팅</option>
                          <option value="target">🎯 전략/기획</option>
                          <option value="users">👥 팀워크</option>
                        </optgroup>
                        <optgroup label="창의적 스킬">
                          <option value="palette">🎨 디자인</option>
                          <option value="camera">📷 사진/영상</option>
                          <option value="music">🎵 음악/오디오</option>
                          <option value="edit">✏️ 글쓰기/편집</option>
                          <option value="video">🎬 영상 제작</option>
                        </optgroup>
                        <optgroup label="일반 역량">
                          <option value="trophy">🏆 리더십</option>
                          <option value="sparkles">✨ 혁신</option>
                          <option value="rocket">🚀 실행력</option>
                          <option value="brain">🧠 분석력</option>
                          <option value="lightbulb">💡 창의력</option>
                          <option value="zap">⚡ 속도/효율</option>
                          <option value="star">⭐ 전문성</option>
                          <option value="heart">❤️ 열정</option>
                          <option value="shield">🛡️ 신뢰성</option>
                          <option value="globe">🌍 글로벌</option>
                        </optgroup>
                      </select>
                    </div>

                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={skill.title}
                        onChange={(e) =>
                          updateSkill(index, "title", e.target.value)
                        }
                        placeholder="예: 프론트엔드 개발, 데이터 분석, 프로젝트 관리"
                        className="w-full px-3 py-2 border rounded-lg bg-background font-semibold"
                      />

                      <textarea
                        value={skill.description}
                        onChange={(e) =>
                          updateSkill(index, "description", e.target.value)
                        }
                        placeholder="예: React와 TypeScript를 활용한 모던 웹 애플리케이션 개발"
                        className="w-full px-3 py-2 border rounded-lg bg-background resize-none"
                        rows={2}
                      />
                    </div>

                    <button
                      onClick={() => removeSkill(index)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}

              <button
                onClick={addSkill}
                className="w-full py-3 border-2 border-dashed rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                스킬 추가
              </button>
            </div>

            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                💡 팁: 아이콘을 선택하고 제목과 설명을 입력하세요. 필요한 만큼
                자유롭게 추가할 수 있습니다.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSkillModal(false)}
                  className="flex-1 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80"
                >
                  닫기
                </button>
                <button
                  onClick={async () => {
                    const success = await saveToFile("about", "Info", aboutInfo)
                    if (success) {
                      alert("✅ 소개 설정이 파일에 저장되었습니다!")
                      setShowSkillModal(false)
                    } else {
                      alert("❌ 파일 저장에 실패했습니다.")
                    }
                  }}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
                >
                  📁 파일에 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 취미 편집 모달 */}
      {showHobbyModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2147483647]">
          <div className="bg-background border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">취미 & 관심사 편집</h3>
              <button
                onClick={() => setShowHobbyModal(false)}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {aboutInfo.hobbies.map((hobby, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <input
                    type="text"
                    value={hobby}
                    onChange={(e) => updateHobby(index, e.target.value)}
                    placeholder="예: 📚 독서"
                    className="flex-1 px-3 py-2 border rounded-lg bg-background"
                  />

                  <button
                    onClick={() => removeHobby(index)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={addHobby}
                className="w-full py-3 border-2 border-dashed rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                취미 추가
              </button>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">🎯 취미 예시:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "📚 독서",
                    "☕ 카페 투어",
                    "🎨 전시회 관람",
                    "✈️ 여행",
                    "🏃 러닝",
                    "📸 사진",
                    "🎮 게임",
                    "🎬 영화 감상",
                    "🎵 음악 감상",
                    "🍳 요리",
                    "🌱 가드닝",
                    "🏊 수영",
                    "🧘 요가",
                    "🎸 기타 연주",
                    "✍️ 글쓰기",
                    "🏕️ 캠핑",
                    "🎭 연극 관람",
                    "🎪 공연 관람",
                    "🚴 자전거",
                    "⛷️ 스키",
                  ].map((example) => (
                    <button
                      key={example}
                      className="px-3 py-1 text-sm bg-muted hover:bg-primary/10 rounded-full transition-all"
                      onClick={() => {
                        if (!aboutInfo.hobbies.includes(example)) {
                          updateAboutInfo("hobbies", [
                            ...aboutInfo.hobbies,
                            example,
                          ])
                        }
                      }}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                💡 팁: 이모지와 함께 취미를 입력하세요. 예시를 클릭하면 새 취미가
                추가됩니다.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowHobbyModal(false)}
                  className="flex-1 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80"
                >
                  닫기
                </button>
                <button
                  onClick={async () => {
                    const success = await saveToFile("about", "Info", aboutInfo)
                    if (success) {
                      alert("✅ 소개 설정이 파일에 저장되었습니다!")
                      setShowHobbyModal(false)
                    } else {
                      alert("❌ 파일 저장에 실패했습니다.")
                    }
                  }}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
                >
                  📁 파일에 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </EditableBackground>
  )
}
