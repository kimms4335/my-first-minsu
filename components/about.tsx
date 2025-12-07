"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  X,
  FolderOpen,
  FileText,
  Star,
  Target,
  Zap,
  Users,
  Activity,
  BookOpen,
  Clock,
  Heart,
  Flame, // 🔥 모토 아이콘용 추가
  BarChart3, // 📊 Skills & Tools 아이콘
} from "lucide-react"
import { EditableText } from "@/components/editable/editable-text"
import { EditableMedia } from "@/components/editable/editable-media"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"
import { COMMON_STYLES } from "@/lib/constants"
const ABOUT_STORAGE_KEY = "about-info-v3"
const ABOUT_BG_STORAGE_KEY = "about-background-v3"



// ---- 타입 정의 ----
type Project = {
  title: string
  period: string
  description: string
  tags: string[]
  coverImage: string
  pdfName: string
  pdfUrl: string
}

type ResumeItem = {
  period: string
  title: string
  subtitle?: string
  description?: string
}

type ResumeActivity = {
  period: string
  title: string
  details: string[]
}

type Resume = {
  personal: { label: string; value: string }[]
  education: ResumeItem[]
  experience: ResumeItem[]
  activities: ResumeActivity[]
  certificates: { date: string; name: string }[]
}

type Highlight = {
  title: string
  description: string
}

type TimelineItem = {
  period: string
  title: string
  description: string
}

type CourseItem = {
  name: string
  detail: string
}

type Stat = {
  label: string
  value: string
  sub: string
}

type ServiceItem = {
  title: string
  description: string
}

type TechCategory = {
  category: string
  items: string
}

type Testimonial = {
  name: string
  role: string
  quote: string
}

type LifePhoto = {
  image: string
  caption: string
}

type AboutLabels = {
  statsSectionTitle: string
  contactTitle: string
  whatIDoTitle: string
  techToolsTitle: string
  keySkillsTitle: string
  highlightsTitle: string
  resumeTitle: string
  educationTitle: string
  experienceTitle: string
  activityTitle: string
  certificateTitle: string
  interestsTitle: string
  interestMottoTitle: string
  timelineTitle: string
  coursesTitle: string
  testimonialTitle: string
  lifeMomentsTitle: string
  projectsTitle: string
  projectTagsLabel: string
  projectPdfNote: string
}

type AboutInfo = {
  title: string
  subtitle: string
  background: { image: string; video: string; color: string; opacity: number }
  profileName: string
  profileTitle: string
  profileSummary: string
  profileImage: string
  contact: { label: string; value: string }[]
  skills: { title: string; level: "상" | "중" | "하"; description: string }[]
  resume: Resume
  projects: Project[]
  highlights: Highlight[]
  interests: string[]
  interestMotto: string
  timeline: TimelineItem[]
  courses: CourseItem[]
  stats: Stat[]
  services: ServiceItem[]
  techStack: TechCategory[]
  testimonials: Testimonial[]
  lifePhotos: LifePhoto[]

  whatIDoNote: string
  resumeCaption: string
  projectsCaption: string

  labels: AboutLabels

  // 🔥 Working Style 텍스트
  workingStyleItems?: string[]
}

export function About() {
  const { getData, saveData, isEditMode } = useInlineEditor()

  const defaultInfo = {
    title: "포트폴리오",
    subtitle: "도시를 관찰하고, 데이터를 읽고, 더 나은 공간을 고민하는 도시계획·부동산학 전공자입니다.",
    background: {"image":"","video":"","color":"","opacity":0.08},
    profileName: "김민수",
    profileTitle: "단국대학교 도시계획부동산학부",
    profileSummary: "    저는 어린 시절부터 제가 자라온 고향이 점점 활기를 잃어가는 모습을 지켜보며 도시의 변화가 사람들의 삶과 지역 사회에 미치는 영향을 몸소 느끼게 되었습니다. 예전에는 사람들로 북적이던 골목이 빈집과 폐상가로 바뀌고, 청년들이 일자리를 찾아 타지로 떠나는 모습을 보며 ‘이 쇠퇴를 막을 방법은 없을까?’라는 고민을 하게 되었습니다. 이를 토대로 도시의 쇠퇴 원인과 회복 방안에 대해 생각해 보며 도시재생 분야에 관심을 갖게 되었습니다. 저는 도시재생이 낡은 건물을 단순히 새로 짓는 일이 아니라, 지역 고유의 역사와 문화를 살리고, 사람과 공간을 다시 연결하는 과정이라고 생각합니다. 이러한 점에서 도시재생은 제 고향과 같은 지역이 다시 활기를 되찾을 수 있도록 만드는 가치 있는 일이라고 생각하는 바입니다. 따라서 지역의 문제를 주민과 함께 해결하여 쇠퇴하는 도시를 지속 가능한 도시로 발전시키는 데 이바지할 수 있는 도시재생 전문가로 성장하는 것이 저의 목표입니다.",
    profileImage: "/uploads/about-profile-1763791766014.jpeg",
    contact: [{"label":"Email","value":"example@naver.com"},{"label":"Phone","value":"010-0000-0000"},{"label":"Address","value":"경기 용인시 수지구 죽전동"},{"label":"GitHub / Blog","value":"https://github.com/your-id"}],
    stats: [{"label":"전공 프로젝트","value":"5+","sub":"수업·팀 과제 포함"},{"label":"관심 분야 리포트","value":"10+","sub":"주택·도시재생·환경 등"},{"label":"교육 봉사","value":"5년+","sub":"아이사랑 동아리 활동 및 고교 시절 멘토링 봉사"}],
    services: [{"title":"도시·부동산 리서치","description":"정책 자료, 통계, 논문과 현장 자료를 종합해 이슈의 흐름을 정리하고 통찰력을 제공합니다."},{"title":"기초 데이터 분석 & 시각화","description":"실거래가, 인구구조, 상권 데이터 등을 데이터 기반 분석 기법으로 구조화하고 해석합니다."},{"title":"기획·발표 및 협업","description":"팀 프로젝트에서 역할 분담, 일정 관리, 발표 자료 제작을 맡으며 구성원들과 조율합니다."}],
    skills: [{"title":"도시·부동산 리서치","level":"상","description":"","percent":90,"detail":"관련 사항 : 정책 자료·통계·실거래가 데이터를 활용한 프로젝트 진행 및 리포트 작성  경험 보유"},{"title":"소프트웨어 활용","level":"중","description":"","percent":95,"detail":"관련 사항 : ArcGIS 기반의 데이터 시각화 및 공간적 패턴 분석을 통해 지역 특성 및 변화 양상을 정밀하게 해석한 경험 보유"},{"title":"공간·현장 관찰","level":"상","description":"","percent":95,"detail":"관련 사항 : 도시재생·주거정책·상권 변화와 관련한 현장조사를 수행하며 관찰 기반의 분석 경험 축적"},{"title":"협업 & 커뮤니케이션","level":"상","description":"","detail":"관련 사항 : 교육봉사 동아리 임원으로서 프로그램 기획, 팀 프로젝트 과정에서 의견 조율과 협업을 통한 문제 해결 경험 보유","percent":98}],
    techStack: [{"category":"데이터 & 분석","items":"실거래가 데이터 · 인구통계 · 상권 · 토지이용 변화"},{"category":"도구 & 소프트웨어","items":"PowerPoint · Word · Excel · ArcGIS"},{"category":"관심 기술","items":"CAD (기초 학습 중) · Spatial Data & GIS · BIM"}],
    resume: {"personal":[{"label":"이름","value":"김민수"},{"label":"생년월일","value":"2001.04.18"},{"label":"주소","value":"경기 용인시 수지구 죽전동"},{"label":"Email","value":"kimms4335@naver.com"}],"education":[{"period":"2017.03 ~ 2020.02","title":"성원고등학교","subtitle":"자연계열"},{"period":"2021.03 ~ 2027.02(졸업 예정)","title":"단국대학교 죽전캠퍼스","subtitle":"도시계획부동산학부                        "}],"experience":[{"period":"2024.03 ~ 2024.06","title":"토지이용계획_지역 답사","description":"명동과 판교를 직접 답사한 경험을 통해 도시계획은 단순한 공간 설계가 아니라 시민의 일상과 삶의 질을 근본적으로 향상시키는 방향으로 이루어져야 한다는 가치관을 확립"},{"period":"2024.03 ~ 2024.06","title":"부동산입지_상권 분석","description":"KFC 양재점과 교대점의 입지·유동인구·상권 특성을 비교 분석하며, 동일 브랜드라도 배후 수요의 특성과 경쟁 환경에 따라 매출이 달라진다는 점을 확인"},{"period":"2024.09 ~ 2024.12","title":"세운상가_지역 답사 및 재건 방안 구상","description":"세운상가 현장 답사를 통해 현장 분석을 진행하였다. 분석된 내용을 토대로 지역 보존과 개발을 조화시킬 수 있는 전략으로 구역별 재건 계획과 공공임대·지식산업 연계 방안을 제시"},{"period":"2025.09 ~ 현재","title":"GIS와 도시공간분석","description":"인구·상권·주거 등 도시 데이터를 지도 기반으로 시각화하고 이에 대한 공간적 패턴을 해석함으로써 도시 문제에 대한 정책적 시사점을 도출하는 능력 함양"}],"activities":[{"period":"2024.03 ~ 현재","title":"교육봉사 동아리(아이사랑) 집행부","details":["• 초·중등 대상 학습 지도 및 놀이 프로그램 진행","• 부원 간 친목 도모 및 행사 기획","• 동아리와 지역아동센터 간 연결"]},{"period":"2025.03 ~ 현재","title":"독서 토론 모임","details":["• 선정 도서에 대한 의견 정리 및 토론 참여","• 서로 다른 관점에 대해 비교·조율하며 합의 도출","• 비판적 사고와 소통 역량 강화"]}],"certificates":[{"date":"2025.09 ~ (프로젝트)","name":"노인복지시설 접근성 분석 프로젝트 마무리"},{"date":"2026.03 ~ (인턴)","name":"[한국토지주택공사(LH)] 청년인턴"},{"date":"2026.06 (목표)","name":"도시계획기사 자격증 취득"},{"date":"2026.07 (목표)","name":"교통기사 자격증 취득"},{"date":"2028.03 (진로)","name":"법학전문대학원 입학"},{"date":"2028.03 (진로)","name":"도시재생 기획가"}]},
    projects: [{"title":"세운상가 프로젝트","period":"도시개발론","description":"세운상가 프로젝트는 공중보행교 철거 논쟁을 중심으로, 상인·시민·방문객 등 다양한 이해관계자의 의견을 분석하고 6개 구역에 대한 종합적 개발 방향을 제안한 도시계획 연구입니다. 선형공원 조성, 우드시티 도입, 주거·산업시설 재배치, 랜드마크 개발 등 도시 구조 전반의 재편 전략을 설계했으며, 데이터와 인터뷰를 결합해 공공성과 경제성을 조화시키는 재생 모델을 도출했습니다.","tags":["#세운상가","#도시재생","#현장조사"],"coverImage":"/uploads/project-cover-0-1764440741968.png","pdfName":"세운상가 리포트","pdfUrl":"https://naver.me/5asLLhzz"},{"title":"KFC 교대점과 양재점에 대한 상권 분석","period":"부동산입지","description":"본 프로젝트는 KFC 교대점과 양재점을 대상으로 상권 범위, 접근성, 시계성, 수요·공급 구조를 종합적으로 분석하여 두 매장의 입지 경쟁력을 비교·평가한 작업입니다.\n설문조사, 지도 분석, 현장조사(도보·버스·지하철·차량 접근성), 주변 인구·시설 분석 등을 통해 실제 매출에 영향을 미칠 수 있는 핵심 요소들을 체계적으로 정리했습니다","tags":["#KFC","#교대점","#양재점","#입지","#상권분석"],"coverImage":"/uploads/project-cover-1-1763810633854.png","pdfName":"KFC 교대점 & 양재점 분석 리포트","pdfUrl":"https://naver.me/xI100N0A"},{"title":"서울 고덕아르테온 아파트 실거래가 분석","period":"토지론입문","description":"고덕아르테온의 2021~2025년 실거래가 변동을 분석한 프로젝트로, 금리·정책·인프라 등 주요 요인을 종합하여 가격 흐름을 해석했습니다.\n하락기 이후 조정기를 거쳐 9호선 개통 등 개발 호재에 따라 2025년 이후 상승세가 예상됩니다.\n본 분석은 단지 가치 평가와 장기적 수요 전망을 데이터 기반으로 제시한 연구입니다.","tags":["#실거래가","#아파트분석","#고덕아르테온"],"coverImage":"/uploads/project-cover-2-1763810806831.png","pdfName":"고덕아르테온 분석 리포트","pdfUrl":"https://naver.me/GScEabVD"},{"title":"일본 주택 문화 및 한·일 고령사회 주거정책 비교","period":"주택론입문","description":"본 프로젝트는 일본의 역사적 배경부터 주거 유형, 지역별 건축 특성, 주택시장 동향, 그리고 일본·한국의 고령화 문제까지 주거정책 관점에서 종합적으로 분석한 연구입니다.\n일본의 주택 문화가 형성된 사회·경제적 맥락을 이해한 뒤 이를 한국의 미래 주거 이슈와 연결해 실질적인 시사점을 도출하는 것을 목표로 하였습니다.","tags":["#고령사회","#주거정책","#비교연구"],"coverImage":"/uploads/project-cover-3-1764440797235.png","pdfName":"일본 주택 문화와 주택 시장 리포트","pdfUrl":"https://naver.me/FhfJJryG"},{"title":"바르셀로나 슈퍼블록 프로젝트","period":"도시재생론","description":"바르셀로나의 ‘슈퍼블록’은 차량 중심의 도시 구조를 보행·자전거 중심으로 전환한 대표적인 도시재생 모델입니다.\n교통량 감소, 대기질 개선, 공공공간 확충 등 도시환경이 크게 향상되었으며, 삶의 질 개선 효과까지 확인되었습니다.\n본 프로젝트는 효과와 한계를 분석하고, 한국 도시들에 적용 가능한 방향을 제시한 연구입니다.","tags":["#바르셀로나","#슈퍼블록","#도시재생","#한국에서의적용","#저층주거지형","#어린이보호구역형"],"coverImage":"/uploads/project-cover-4-1763811880168.png","pdfName":"바르셀로나 슈퍼블록 프로젝트 리포트","pdfUrl":"https://naver.me/GRugewfV"},{"title":"지방 소멸에 대응하기 위한 혁신도시의 역할 및 한계 그리고 개선 방안","period":"국토및지역계획","description":"나주 혁신도시의 인구 변화, 교통체계, 녹지·정주환경을 분석하여 혁신도시 정책의 효과와 한계를 평가한 프로젝트입니다.\n광역 접근성과 교통 서비스 개선 등 긍정적인 성과가 있었지만, 수도권 인구 분산과 생활 인프라 측면에서는 여전히 한계가 드러났습니다.\n본 연구는 이러한 문제를 해결할 수 있는 교통·정주환경 개선 전략과 지속가능한 도시 발전 방안을 제시합니다.","tags":["#나주혁신도시","#지방소멸","#역할","#한계","#개선방안"],"coverImage":"/uploads/project-cover-5-1763813569998.png","pdfName":"나주 혁신도시 리포트","pdfUrl":"https://naver.me/FRuiekSX"}],
    highlights: [{"title":"현장을 보는 시각","description":"지역을 직접 답사하며 지도·통계로는 식별하기 어려운 생활권 특성, 이용 패턴, 공간적 잠재력에 대해 분석해 왔습니다. 또한, 현장에서 파악한 상황적 맥락을 정량 데이터와 연계하여 공간 문제의 원인을 구조적으로 해석하고, 실현 가능성을 고려한 도시계획적 대안을 도출하는 역량을 보유하고 있습니다. 이러한 접근을 통해 현장 기반 분석 관점을 구축해 왔습니다."},{"title":"꾸준함과 책임감","description":"동아리 활동과 팀 프로젝트에서 맡은 역할을 끝까지 책임감 있게 수행해 왔습니다. 특히 일정 관리, 자료 정리, 구성원 간 의견 조율 등 겉으로 드러나지 않는 업무까지 주도적으로 챙기며 프로젝트 전반의 완성도를 높였습니다. 이러한 경험을 토대로 어떠한 환경에서도 성과를 만들어낼 수 있는 실행력과 책임감을 갖추게 되었습니다."},{"title":"소통 능력","description":"상대방의 입장과 필요를 파악하여 협력의 방향을 조율하는 데 강점을 가지고 있습니다. 이러한 역량을 바탕으로 의견이 충돌하거나 이해가 엇갈리는 상황에서도 각자의 논리를 구조적으로 정리하고 공통의 목표를 도출함으로써 대안을 마련하는 과정을 안정적으로 이끌어 왔습니다. 이러한 소통 능력은 다양한 이해관계자가 참여하는 도시계획 과정에서 복잡한 이해관계를 조율하고 설득력 있는 방향성을 제시하는 데 중요한 기반이 될 것입니다."}],
    interests: ["#도시재생","#주택시장","#고령사회","#보행친화도시","#상권분석","#도시계획"],
    interestMotto: "\"최고보다 최선을\"",
    timeline: [{"period":"2017.03 ~ 2020.02","title":"성원고등학교","description":"학업과 학생회 활동을 병행하며 교내 행사 기획과 운영을 맡아 책임감을 키움."},{"period":"2021.03 ~ 현재","title":"단국대학교 도시계획부동산학부","description":"도시계획·부동산 전공 지식과 함께, 팀 프로젝트 및 현장에 대한 경험을 쌓는 중."},{"period":"2021.07 ~ 2023.01","title":"육군 병장 만기전역","description":"다양한 사람들과 공동 생활을 하며 배려·협업의 중요성을 배우고, 맡은 임무를 끝까지 수행하는 책임감을 키움"},{"period":"2024 ~ 현재","title":"아이사랑 동아리","description":"교육봉사를 통해 사람들과 소통하고 협업하는 경험을 지속적으로 확장."}],
    courses: [{"name":"GIS와 도시공간분석","detail":"공간 데이터의 구조와 활용 방식을 이해하고 이를 바탕으로 도시의 패턴·입지·변화를 시각적으로 해석하는 능력을 학습했습니다. 다양한 공간 분석 기법(Buffer, Density, Spatial Join 등)을 실습하며 정량 데이터를 통해 도시문제를 진단하고 의사결정에 활용할 수 있는 기반을 구축했습니다."},{"name":"토지론입문","detail":"토지가 갖는 경제적·법적 특성과 제도적 기반을 학습하며, 토지 이용 방식이 사회·경제·환경 전반과 어떻게 연결되는지 이해했습니다. 토지의 효용, 공공성, 지가 형성 원리 등을 통해 정책 설계와 도시계획의 기초가 되는 사고방식을 다졌습니다."},{"name":"부동산입지","detail":"주택·상업·업무·산업 등 각 유형별 부동산 시장 구조를 이해하고, 입지 요인이 가격과 수요에 미치는 영향을 분석했습니다. 이를 통해 부동산 가치를 결정하는 핵심 변수들을 구조적으로 파악하고, 공간경제적 관점에서 시장을 분석하는 능력을 기르게 되었습니다."},{"name":"도시재생론","detail":"쇠퇴 지역의 구조적 요인을 파악하고 재생 전략을 설계하는 과정을 학습했습니다. 국내외 도시재생 사례를 비교하며 경제·사회·물리·환경 요소가 재생사업에 어떤 영향을 미치는지 분석했으며, 지역 자원의 활용과 공동체 참여의 중요성을 이해했습니다."},{"name":"토지이용계획","detail":"토지의 효율적 활용을 위해 필요한 계획 체계와 제도를 학습했습니다. 용도지역·지구·구역 등 규제 구조를 이해하고, 공간적 배분이 도시 기능과 지속가능성에 어떠한 영향을 미치는지 분석했습니다. 실제 사례를 통해 토지이용의 갈등 요인을 진단하는 시각을 키웠습니다."},{"name":"도시계획","detail":"도시의 구조를 이루는 여러 요소(토지이용, 교통, 주거, 환경)를 통합적으로 고려한 계획의 원리를 학습했습니다. 도시문제를 진단하고 계획적 대응을 설계하는 방법을 익히며, 지속가능한 도시 발전을 도모하는 의사결정 구조를 이해했습니다."},{"name":"AI와 도시계획","detail":"인공지능 기반 분석 도구를 활용해 도시 데이터를 해석하고 미래 도시 변화를 예측하는 능력을 기르는 데 중점을 두었습니다. 머신러닝·공간 빅데이터 등 최신 기술을 도시계획에 접목하는 사례를 학습하며, 기술 활용형 도시계획 역량을 확장했습니다."},{"name":"도시개발론","detail":"도시개발의 이론과 절차를 체계적으로 이해하며, 공공·민간의 역할이 개발 과정에서 어떻게 분담되는지 분석했습니다. 개발사업의 타당성 평가, 지가 구조, 법적 제도 등을 학습해 실제 사업 프로세스 전반에 대한 이해도를 높였습니다."},{"name":"부동산 사법","detail":"부동산 거래와 권리 관계를 규율하는 법적 원리를 체계적으로 이해한 과목입니다. 물권·채권·계약 등 기초 법리부터 실제 거래 과정에서 발생할 수 있는 다양한 법적 쟁점을 사례 중심으로 분석했습니다. 이를 통해 부동산 권리 보호 구조와 거래의 안정성을 확보하기 위한 법적 장치를 깊이 있게 이해했습니다."},{"name":"교통계획","detail":"도시 내 이동수요와 교통 흐름을 분석하는 기법을 학습하며, 교통 체계가 도시 구조와 생활권 형성에 미치는 영향을 종합적으로 이해했습니다. 교통량 예측, 노선 계획 등 기초 분석뿐 아니라 지속 가능한 교통체계 구축을 위한 전략과 정책적 접근을 함께 탐구했습니다."},{"name":"부동산 조세","detail":"부동산에 부과되는 각종 조세 제도(취득세·재산세·종부세 등)의 구조와 부과 원리를 학습하고, 조세정책이 시장의 공정성·효율성·형평성에 미치는 영향을 분석했습니다. 실제 세율 구조와 정책 변화를 기반으로 조세가 부동산 시장 안정화 및 자원 배분에 어떤 역할을 수행하는지 이해했고, 바람직한 과세 방향을 탐구했습니다."},{"name":"부동산 프롭테크","detail":"AI·빅데이터·블록체인 등 첨단 기술이 부동산 시장에 적용되는 메커니즘을 체계적으로 학습했습니다. 공간 데이터 처리 및 자동화 기술 등 실제 사례를 분석하며 기술 도입이 거래 효율성·투명성·접근성 향상에 어떤 영향을 미치는지 평가했습니다. 이를 통해 기술 중심의 미래 부동산 산업 구조와 새로운 서비스 모델을 이해했습니다."},{"name":"환경관리, 국토 및 지역계획 등","detail":"다양한 전공 과목을 수강함."}],
    testimonials: [{"name":"동아리 부원","role":"아이사랑","quote":"편하게 다가가 고민을 털어놓을 수 있는 선배이자 필요할 때는 방향을 잡아주는 책임감 있는 집행부."},{"name":"팀 프로젝트 팀원","role":"전공 수업 & 교양 수업","quote":"의견을 조율하며 팀 분위기를 안정시키는 사람, 맡은 일은 끝까지 책임지는 믿음직한 팀원."},{"name":"전공과목에 대한 교수님","role":"수업 피드백","quote":"도시개발론이라는 과목에 늘 진지한 태도로 임하며 성실하게 참여한 학생이고, 그런 꾸준함 덕분에 기억에 남는 학생"}],
    lifePhotos: [{"image":"/uploads/life-photo-0-1763809986427.png","caption":"부동산입지_KFC 답사"},{"image":"/uploads/life-photo-1-1763810004680.jpg","caption":"도시개발론_세운상가 답사"},{"image":"/uploads/life-photo-2-1763810015595.png","caption":"토지이용계획_판교 답사"},{"image":"/uploads/life-photo-3-1763810035318.jpg","caption":"교육봉사 동아리_장학금 행사"},{"image":"/uploads/life-photo-4-1763809743535.jpg","caption":"교육봉사 동아리_활동"},{"image":"/uploads/life-photo-5-1763810025470.jpg","caption":"교육봉사 동아리_학교 투어"}],
    whatIDoNote: "Ability",
    resumeCaption: "주요 학력과 경험을 한 눈에 볼 수 있도록 정리했습니다.",
    projectsCaption: "수업·과제·개인 프로젝트 중 보여주고 싶은 작업을 정리한 영역입니다.",
    labels: {"statsSectionTitle":"경험","contactTitle":"CONTACT","whatIDoTitle":"What I Do","techToolsTitle":"TECH & TOOLS","keySkillsTitle":"Skills & Tools","highlightsTitle":"핵심 역량","resumeTitle":"자기 PR","educationTitle":"학력","experienceTitle":"전공 관련 경험","activityTitle":"활동 & 대외 경험","certificateTitle":"자격 및 기타","interestsTitle":"관심 분야","interestMottoTitle":"모토","timelineTitle":"타임라인","coursesTitle":"수강 과목 & 학습 주제","testimonialTitle":"함께한 사람들이 본 나","lifeMomentsTitle":"Life & Moments","projectsTitle":"Projects","projectTagsLabel":"태그 (공백으로 구분):","projectPdfNote":"* 네이버 MYBOX, 구글드라이브 등 공유 링크도 그대로 넣으면 됩니다."},
    workingStyleItems: ["데이터를 근거로 판단하며 현장 조사를 통해 분석의 깊이를 더합니다.","문제의 본질을 찾기 위해 다양한 관점을 검토하고, 논리적으로 결론을 도출합니다.","소통과 책임을 중시하며 맡은 역할을 끝까지 수행합니다.","늘 2% 부족하다고 생각하며 현재에 안주하지 않고 더 나은 결과를 위해 꾸준히 개선합니다.","피드백을 성장의 기회로 받아들이고, 개선점을 즉시 작업 및 업무에 반영합니다.","업무의 중요도를 기반으로 우선순위를 명확히 설정하여, 모든 과정을 체계적이고 효율적으로 수행합니다."]
  }

  const [aboutInfo, setAboutInfo] = useState<AboutInfo>(defaultInfo)
  const [backgroundData, setBackgroundData] = useState(defaultInfo.background)

  // --------- 데이터 로딩 ----------
useEffect(() => {
  const saved = getData(ABOUT_STORAGE_KEY) as Partial<AboutInfo> | null
  if (saved) {
    const savedProjects = (saved.projects || defaultInfo.projects) as any[]
    const normalizedProjects: Project[] = savedProjects.map((p) => ({
      title: p.title ?? "",
      period: p.period ?? "",
      description: p.description ?? "",
      tags: p.tags ?? [],
      coverImage: p.coverImage ?? "",
      pdfName: p.pdfName ?? "",
      pdfUrl: p.pdfUrl ?? "",
    }))

const merged: AboutInfo = {
  ...defaultInfo,
  ...saved,
  background: { ...defaultInfo.background, ...(saved.background || {}) },
  resume: { ...defaultInfo.resume, ...(saved.resume || {}) },
  projects: normalizedProjects,
  highlights: (saved.highlights as Highlight[] | undefined) ?? defaultInfo.highlights,
  interests: saved.interests || defaultInfo.interests,
  timeline: saved.timeline || defaultInfo.timeline,
  courses: saved.courses || defaultInfo.courses,
  stats: saved.stats || defaultInfo.stats,
  services: saved.services || defaultInfo.services,
  techStack: saved.techStack || defaultInfo.techStack,
  testimonials: saved.testimonials || defaultInfo.testimonials,
  lifePhotos: saved.lifePhotos || defaultInfo.lifePhotos,
  whatIDoNote: saved.whatIDoNote || defaultInfo.whatIDoNote,
  resumeCaption: saved.resumeCaption || defaultInfo.resumeCaption,
  projectsCaption: saved.projectsCaption || defaultInfo.projectsCaption,
  labels: saved.labels || defaultInfo.labels,
  interestMotto: saved.interestMotto || defaultInfo.interestMotto,
  workingStyleItems:
    saved.workingStyleItems || defaultInfo.workingStyleItems,
}


    setAboutInfo(merged)
    if (saved.background) setBackgroundData(saved.background)
  }

  const savedBg = getData(ABOUT_BG_STORAGE_KEY) as
    | { image: string; video: string; color: string; opacity: number }
    | null
  if (savedBg) setBackgroundData(savedBg)
}, [isEditMode])


const updateAboutInfo = (key: keyof AboutInfo, value: any) => {
  const newInfo = { ...aboutInfo, [key]: value }
  setAboutInfo(newInfo)
  saveData(ABOUT_STORAGE_KEY, newInfo)
}


  const updateLabels = (partial: Partial<AboutLabels>) => {
    const newLabels = { ...aboutInfo.labels, ...partial }
    updateAboutInfo("labels", newLabels)
  }

  // --------- 리스트 항목 업데이트/추가/삭제 유틸 ----------

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const newProjects = [...aboutInfo.projects]
    newProjects[index] = { ...newProjects[index], [field]: value }
    updateAboutInfo("projects", newProjects)
  }

  const addProject = () => {
    const newProjects: Project[] = [
      ...aboutInfo.projects,
      {
        title: "새 프로젝트",
        period: "2024",
        description: "프로젝트 설명을 입력하세요.",
        tags: ["#프로젝트"],
        coverImage: "",
        pdfName: "",
        pdfUrl: "",
      },
    ]
    updateAboutInfo("projects", newProjects)
  }

  const removeProject = (index: number) => {
    updateAboutInfo(
      "projects",
      aboutInfo.projects.filter((_, i) => i !== index),
    )
  }

  const updateProjectTags = (index: number, tagsString: string) => {
    const tags = tagsString
      .split(" ")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
    updateProject(index, "tags", tags)
  }

  const updateResume = (
    section: keyof Resume,
    index: number,
    field: string,
    value: string,
    detailIndex?: number,
  ) => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))

    if (section === "activities" && typeof detailIndex === "number") {
      newResume.activities[index].details[detailIndex] = value
    } else {
      ;(newResume as any)[section][index][field] = value
    }

    updateAboutInfo("resume", newResume)
  }

  const addPersonalField = () => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.personal.push({ label: "항목", value: "내용을 입력하세요." })
    updateAboutInfo("resume", newResume)
  }

  const removePersonalField = (index: number) => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.personal.splice(index, 1)
    updateAboutInfo("resume", newResume)
  }

  const addEducation = () => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.education.push({
      period: "연도 ~ 연도",
      title: "학교 / 과정",
      subtitle: "전공 / 계열",
    })
    updateAboutInfo("resume", newResume)
  }

  const removeEducation = (index: number) => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.education.splice(index, 1)
    updateAboutInfo("resume", newResume)
  }

  const addExperience = () => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.experience.push({
      period: "연도 ~ 연도",
      title: "경험 제목",
      description: "설명을 입력하세요.",
    })
    updateAboutInfo("resume", newResume)
  }

  const removeExperience = (index: number) => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.experience.splice(index, 1)
    updateAboutInfo("resume", newResume)
  }

  const addActivity = () => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.activities.push({
      period: "연도 ~ 연도",
      title: "활동명",
      details: ["활동 내용을 입력하세요."],
    })
    updateAboutInfo("resume", newResume)
  }

  const removeActivity = (index: number) => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.activities.splice(index, 1)
    updateAboutInfo("resume", newResume)
  }

  const addActivityDetail = (activityIndex: number) => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.activities[activityIndex].details.push("추가 내용을 입력하세요.")
    updateAboutInfo("resume", newResume)
  }

  const removeActivityDetail = (activityIndex: number, detailIndex: number) => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.activities[activityIndex].details.splice(detailIndex, 1)
    updateAboutInfo("resume", newResume)
  }

  const addCertificate = () => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.certificates.push({
      date: "연도.월.일",
      name: "자격증 / 수료증 이름",
    })
    updateAboutInfo("resume", newResume)
  }

  const removeCertificate = (index: number) => {
    const newResume: Resume = JSON.parse(JSON.stringify(aboutInfo.resume))
    newResume.certificates.splice(index, 1)
    updateAboutInfo("resume", newResume)
  }

  const addHighlight = () => {
    const newList = [
      ...aboutInfo.highlights,
      { title: "새 강점", description: "설명을 입력하세요." },
    ]
    updateAboutInfo("highlights", newList)
  }

  const removeHighlight = (index: number) => {
    updateAboutInfo(
      "highlights",
      aboutInfo.highlights.filter((_, i) => i !== index),
    )
  }

  const addTimelineItem = () => {
    const newList = [
      ...aboutInfo.timeline,
      {
        period: "연도 ~ 연도",
        title: "새 타임라인",
        description: "설명을 입력하세요.",
      },
    ]
    updateAboutInfo("timeline", newList)
  }

  const removeTimelineItem = (index: number) => {
    updateAboutInfo(
      "timeline",
      aboutInfo.timeline.filter((_, i) => i !== index),
    )
  }

  const addCourse = () => {
    const newList = [
      ...aboutInfo.courses,
      { name: "새 과목", detail: "과목 설명을 입력하세요." },
    ]
    updateAboutInfo("courses", newList)
  }

  const removeCourse = (index: number) => {
    updateAboutInfo(
      "courses",
      aboutInfo.courses.filter((_, i) => i !== index),
    )
  }

  const addInterest = () => {
    const newList = [...aboutInfo.interests, "#새로운관심분야"]
    updateAboutInfo("interests", newList)
  }

  const removeInterest = (index: number) => {
    updateAboutInfo(
      "interests",
      aboutInfo.interests.filter((_, i) => i !== index),
    )
  }

  const addStat = () => {
    const newList = [
      ...aboutInfo.stats,
      { label: "새 항목", value: "0", sub: "설명을 입력하세요." },
    ]
    updateAboutInfo("stats", newList)
  }

  const removeStat = (index: number) => {
    updateAboutInfo(
      "stats",
      aboutInfo.stats.filter((_, i) => i !== index),
    )
  }

  const addService = () => {
    const newList = [
      ...aboutInfo.services,
      { title: "새 역할", description: "설명을 입력하세요." },
    ]
    updateAboutInfo("services", newList)
  }

  const removeService = (index: number) => {
    updateAboutInfo(
      "services",
      aboutInfo.services.filter((_, i) => i !== index),
    )
  }

  const addTech = () => {
    const newList = [
      ...aboutInfo.techStack,
      { category: "새 카테고리", items: "내용을 입력하세요." },
    ]
    updateAboutInfo("techStack", newList)
  }

  const removeTech = (index: number) => {
    updateAboutInfo(
      "techStack",
      aboutInfo.techStack.filter((_, i) => i !== index),
    )
  }

  const addTestimonial = () => {
    const newList = [
      ...aboutInfo.testimonials,
      {
        name: "이름",
        role: "관계",
        quote: "피드백 내용을 입력하세요.",
      },
    ]
    updateAboutInfo("testimonials", newList)
  }

  const removeTestimonial = (index: number) => {
    updateAboutInfo(
      "testimonials",
      aboutInfo.testimonials.filter((_, i) => i !== index),
    )
  }

  const addLifePhoto = () => {
    const newList = [
      ...aboutInfo.lifePhotos,
      { image: "", caption: "사진 설명을 입력하세요." },
    ]
    updateAboutInfo("lifePhotos", newList)
  }

  const removeLifePhoto = (index: number) => {
    updateAboutInfo(
      "lifePhotos",
      aboutInfo.lifePhotos.filter((_, i) => i !== index),
    )
  }

  // 🔧 Skills 추가/삭제
  const addSkill = () => {
    const newList = [
      ...aboutInfo.skills,
      { title: "새 Skill", level: "중", description: "" },
    ]
    updateAboutInfo("skills", newList)
  }

  const removeSkill = (index: number) => {
    updateAboutInfo(
      "skills",
      aboutInfo.skills.filter((_, i) => i !== index),
    )
  }

  // 🔧 Working Style 문장 추가
const addWorkingStyleItem = () => {
  const list = aboutInfo.workingStyleItems || []
  const newList = [...list, "새로운 문장을 입력하세요."]
  updateAboutInfo("workingStyleItems", newList)
}

// 🔧 Working Style 문장 수정
const updateWorkingStyleItem = (index: number, value: string) => {
  const list = aboutInfo.workingStyleItems || []
  const newList = [...list]
  newList[index] = value
  updateAboutInfo("workingStyleItems", newList)
}

// 🔧 Working Style 문장 삭제
const removeWorkingStyleItem = (index: number) => {
  const list = aboutInfo.workingStyleItems || []
  const newList = list.filter((_, i) => i !== index)
  updateAboutInfo("workingStyleItems", newList)
}


  const getLevelChip = (level: "상" | "중" | "하") => {
    if (level === "상")
      return (
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
          상
        </span>
      )
    if (level === "중")
      return (
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
          중
        </span>
      )
    return (
      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800/40 dark:text-slate-200">
        하
      </span>
    )
  }

  const getHighlightIcon = (index: number) => {
    if (index === 0) return <Star className="w-5 h-5 text-primary" />
    if (index === 1) return <Users className="w-5 h-5 text-primary" />
    return <Activity className="w-5 h-5 text-primary" />
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
    saveData(ABOUT_BG_STORAGE_KEY, newData)

    const updated = { ...aboutInfo, background: newData }
    setAboutInfo(updated)
    saveData(ABOUT_STORAGE_KEY, updated)
  }}
  storageKey={ABOUT_BG_STORAGE_KEY}
  className="py-20 bg-muted/30 relative"
>

      <section id="about" className="w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          {/* 상단 Hero 영역 */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 items-stretch">
            {/* 프로필 + 요약 */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/5 via-background to-background">
              <CardContent className="p-8 flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-40 md:h-40 rounded-2xl overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
                  <EditableMedia
                    src={aboutInfo.profileImage}
                    onChange={(src) => updateAboutInfo("profileImage", src)}
                    type="image"
                    storageKey="about-profile-image"
                    className="w-full h-full object-cover"
                    alt="프로필 이미지"
                    purpose="about-profile"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                      <EditableText
                        value={aboutInfo.profileName}
                        onChange={(value) =>
                          updateAboutInfo("profileName", value)
                        }
                        storageKey="about-profile-name"
                      />
                    </h1>
                    <p className="text-primary mt-1 font-medium">
                      <EditableText
                        value={aboutInfo.profileTitle}
                        onChange={(value) =>
                          updateAboutInfo("profileTitle", value)
                        }
                        storageKey="about-profile-title"
                        multiline
                      />
                    </p>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <EditableText
                      value={aboutInfo.profileSummary}
                      onChange={(value) =>
                        updateAboutInfo("profileSummary", value)
                      }
                      storageKey="about-profile-summary"
                      multiline
                    />
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* ABOUT 텍스트 + CONTACT */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">
                  <EditableText
                    value={aboutInfo.title}
                    onChange={(value) => updateAboutInfo("title", value)}
                    storageKey="about-title"
                  />
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <EditableText
                    value={aboutInfo.subtitle}
                    onChange={(value) => updateAboutInfo("subtitle", value)}
                    storageKey="about-subtitle"
                    multiline
                  />
                </p>
              </div>

              <Card className="border-0 shadow-md">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-muted-foreground tracking-wide">
                      <EditableText
                        value={aboutInfo.labels.contactTitle}
                        onChange={(value) =>
                          updateLabels({ contactTitle: value })
                        }
                        storageKey="label-contact-title"
                      />
                    </h3>
                    {isEditMode && (
                      <button
                        onClick={addPersonalField}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                      >
                        <Plus className="w-3 h-3" />
                        항목 추가
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    {aboutInfo.resume.personal.map((item, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-[80px_minmax(0,1fr)_auto] gap-2 items-center"
                      >
                        <span className="text-xs text-muted-foreground">
                          <EditableText
                            value={item.label}
                            onChange={(value) =>
                              updateResume("personal", idx, "label", value)
                            }
                            storageKey={`resume-personal-${idx}-label`}
                          />
                        </span>
                        <span className="font-medium break-words">
                          <EditableText
                            value={item.value}
                            onChange={(value) =>
                              updateResume("personal", idx, "value", value)
                            }
                            storageKey={`resume-personal-${idx}-value`}
                          />
                        </span>
                        {isEditMode && (
                          <button
                            onClick={() => removePersonalField(idx)}
                            className="text-[10px] text-muted-foreground hover:text-destructive"
                          >
                            삭제
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 상단 Stats 배너 */}
          {aboutInfo.stats.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-muted-foreground">
                  <EditableText
                    value={aboutInfo.labels.statsSectionTitle}
                    onChange={(value) =>
                      updateLabels({ statsSectionTitle: value })
                    }
                    storageKey="label-stats-section-title"
                  />
                </span>
                {isEditMode && (
                  <button
                    onClick={addStat}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-3 h-3" />
                    항목 추가
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aboutInfo.stats.map((s, idx) => (
                  <Card
                    key={idx}
                    className="border-0 shadow-md bg-card/80 hover:bg-card transition-colors relative"
                  >
                    <CardContent className="p-4 space-y-1">
                      {isEditMode && (
                        <button
                          onClick={() => removeStat(idx)}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}
                      <p className="text-xs text-muted-foreground">
                        <EditableText
                          value={s.label}
                          onChange={(value) => {
                            const newStats = [...aboutInfo.stats]
                            newStats[idx].label = value
                            updateAboutInfo("stats", newStats)
                          }}
                          storageKey={`stat-${idx}-label`}
                        />
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        <EditableText
                          value={s.value}
                          onChange={(value) => {
                            const newStats = [...aboutInfo.stats]
                            newStats[idx].value = value
                            updateAboutInfo("stats", newStats)
                          }}
                          storageKey={`stat-${idx}-value`}
                        />
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <EditableText
                          value={s.sub}
                          onChange={(value) => {
                            const newStats = [...aboutInfo.stats]
                            newStats[idx].sub = value
                            updateAboutInfo("stats", newStats)
                          }}
                          storageKey={`stat-${idx}-sub`}
                          multiline
                        />
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* What I Do + Tech & Tools + Skills & Working Style */}
{/* What I Do / Tech & Tools / Skills & Tools / Working Style */}
<div className="space-y-8">
  {/* 1행: What I Do (왼쪽 6) / Tech & Tools(오른쪽 4) */}
  <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-8">
    {/* What I Do */}
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <EditableText
            value={aboutInfo.labels.whatIDoTitle}
            onChange={(value) => updateLabels({ whatIDoTitle: value })}
            storageKey="label-what-i-do-title"
          />
        </h2>
        <span className="text-xs text-muted-foreground">
          <EditableText
            value={aboutInfo.whatIDoNote}
            onChange={(value) => updateAboutInfo("whatIDoNote", value)}
            storageKey="what-i-do-note"
          />
        </span>
      </div>

      <div className="flex items-center justify-end gap-2">
        {isEditMode && (
          <button
            onClick={addService}
            className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5 mb-1"
          >
            <Plus className="w-3 h-3" />
            카드 추가
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {aboutInfo.services.map((srv, idx) => (
          <Card
            key={idx}
            className="border bg-card/70 shadow-sm hover:shadow-md transition-shadow relative"
          >
            <CardContent className="p-4 space-y-2">
              {isEditMode && (
                <button
                  onClick={() => removeService(idx)}
                  className={COMMON_STYLES.deleteButton}
                >
                  <X className={COMMON_STYLES.deleteIcon} />
                </button>
              )}
              <p className="text-sm font-semibold">
                <EditableText
                  value={srv.title}
                  onChange={(value) => {
                    const newServices = [...aboutInfo.services]
                    newServices[idx].title = value
                    updateAboutInfo("services", newServices)
                  }}
                  storageKey={`service-${idx}-title`}
                />
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <EditableText
                  value={srv.description}
                  onChange={(value) => {
                    const newServices = [...aboutInfo.services]
                    newServices[idx].description = value
                    updateAboutInfo("services", newServices)
                  }}
                  storageKey={`service-${idx}-desc`}
                  multiline
                />
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

    {/* 오른쪽: Tech & Tools (1행) */}
    <div className="space-y-6">
      <Card className="border-0 shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-muted-foreground tracking-wide flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <EditableText
                value={aboutInfo.labels.techToolsTitle}
                onChange={(value) => updateLabels({ techToolsTitle: value })}
                storageKey="label-tech-tools-title"
              />
            </h3>
            {isEditMode && (
              <button
                onClick={addTech}
                className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
              >
                <Plus className="w-3 h-3" />
                항목 추가
              </button>
            )}
          </div>

          <div className="space-y-2">
            {aboutInfo.techStack.map((t, idx) => (
              <div key={idx} className="space-y-1 relative">
                {isEditMode && (
                  <button
                    onClick={() => removeTech(idx)}
                    className={COMMON_STYLES.deleteButton}
                  >
                    <X className={COMMON_STYLES.deleteIcon} />
                  </button>
                )}
                <p className="text-xs font-semibold text-foreground">
                  <EditableText
                    value={t.category}
                    onChange={(value) => {
                      const newTech = [...aboutInfo.techStack]
                      newTech[idx].category = value
                      updateAboutInfo("techStack", newTech)
                    }}
                    storageKey={`tech-${idx}-cat`}
                  />
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <EditableText
                    value={t.items}
                    onChange={(value) => {
                      const newTech = [...aboutInfo.techStack]
                      newTech[idx].items = value
                      updateAboutInfo("techStack", newTech)
                    }}
                    storageKey={`tech-${idx}-items`}
                    multiline
                  />
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>

  {/* 2행: Skills & Tools(왼쪽 6) / Working Style(오른쪽 4) */}
  <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-4">
{/* 📊 Skills & Tools (레벨 제거 버전) */}
<Card className="border-0 shadow-md">
  <CardContent className="p-5 space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-muted-foreground tracking-wide">
          <EditableText
            value={aboutInfo.labels.keySkillsTitle}
            onChange={(value) => updateLabels({ keySkillsTitle: value })}
            storageKey="label-key-skills-title"
          />
        </h3>
      </div>

      {isEditMode && (
        <button
          onClick={addSkill}
          className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
        >
          <Plus className="w-3 h-3" /> 막대 추가
        </button>
      )}
    </div>

    <div className="space-y-4">
      {aboutInfo.skills.map((skill, idx) => {
        // 기본 퍼센트값(레벨과 무관)
        const percent = (skill as any).percent ?? 70

        return (
          <div key={idx} className="space-y-2 relative">
            {isEditMode && (
              <button
                onClick={() => removeSkill(idx)}
                className={COMMON_STYLES.deleteButton}
              >
                <X className={COMMON_STYLES.deleteIcon} />
              </button>
            )}

            {/* 제목 */}
            <span className="font-medium text-sm">
              <EditableText
                value={skill.title}
                onChange={(value) => {
                  const newSkills = [...aboutInfo.skills]
                  newSkills[idx].title = value
                  updateAboutInfo("skills", newSkills)
                }}
                storageKey={`skills-${idx}-title`}
              />
            </span>

{/* 🆕 관련 사항 입력란 추가 */}
<div className="text-xs text-muted-foreground">
  <EditableText
    value={skill.detail || "관련 사항 : "}
    onChange={(value) => {
      const newSkills = [...aboutInfo.skills]
      newSkills[idx].detail = value
      updateAboutInfo("skills", newSkills)
    }}
    storageKey={`skills-${idx}-detail`}
    multiline
  />
</div>

{/* 퍼센트 수정 */}
<div className="flex items-center gap-2 text-xs text-muted-foreground">

  {/* 라벨도 수정 가능 */}
  <EditableText
    value={"Percent :"}
    onChange={() => {}}
    storageKey="skills-percent-label"
  />

  {/* 숫자 수정 가능 */}
  <EditableText
    value={String(percent)}
    onChange={(value) => {
      const newSkills = [...aboutInfo.skills]
      newSkills[idx].percent = Number(value) || 0
      updateAboutInfo("skills", newSkills)
    }}
    storageKey={`skills-${idx}-percent`}
  />

</div>


            {/* 막대 그래프 */}
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  </CardContent>
</Card>

{/* 💬 WORKING STYLE */}
<Card className="border-0 shadow-md max-h-[240px] overflow-y-auto">
  <CardContent className="p-5 space-y-3">


    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold text-muted-foreground tracking-wide">
        WORKING STYLE
      </h3>

      {isEditMode && (
        <button
          onClick={addWorkingStyleItem}
          className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
        >
          <Plus className="w-3 h-3" />
          문장 추가
        </button>
      )}
    </div>

    <ul className="mt-1 space-y-1 text-sm text-foreground">
      {(aboutInfo.workingStyleItems || []).map((item, idx) => (
        <li key={idx} className="flex items-start gap-2">
          <span className="mt-[3px]">•</span>
          <div className="flex-1">
            <EditableText
              value={item}
              onChange={(value) => updateWorkingStyleItem(idx, value)}
              storageKey={`working-style-${idx}`}
            />
          </div>

          {isEditMode && (
            <button
              onClick={() => removeWorkingStyleItem(idx)}
              className="text-[10px] text-muted-foreground hover:text-destructive ml-1"
            >
              삭제
            </button>
          )}
        </li>
      ))}
    </ul>

  </CardContent>
</Card>
  </div>
</div>

          {/* ⭐ 강점 하이라이트 */}
          {aboutInfo.highlights.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  <EditableText
                    value={aboutInfo.labels.highlightsTitle}
                    onChange={(value) =>
                      updateLabels({ highlightsTitle: value })
                    }
                    storageKey="label-highlights-title"
                  />
                </h2>
                <div className="flex items-center gap-2">
                  {isEditMode && (
                    <button
                      onClick={addHighlight}
                      className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                    >
                      <Plus className="w-3 h-3" />
                      카드 추가
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aboutInfo.highlights.map((h, idx) => (
                  <Card
                    key={idx}
                    className="border bg-card/70 shadow-sm hover:shadow-md transition-shadow relative"
                  >
                    <CardContent className="p-4 space-y-2">
                      {isEditMode && (
                        <button
                          onClick={() => removeHighlight(idx)}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}
                      <div className="flex items-center gap-2">
                        {getHighlightIcon(idx)}
                        <h3 className="text-sm font-semibold">
                          <EditableText
                            value={h.title}
                            onChange={(value) => {
                              const newH = [...aboutInfo.highlights]
                              newH[idx].title = value
                              updateAboutInfo("highlights", newH)
                            }}
                            storageKey={`highlight-${idx}-title`}
                          />
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <EditableText
                          value={h.description}
                          onChange={(value) => {
                            const newH = [...aboutInfo.highlights]
                            newH[idx].description = value
                            updateAboutInfo("highlights", newH)
                          }}
                          storageKey={`highlight-${idx}-desc`}
                          multiline
                        />
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* 이력서 섹션 */}
          <div className="space-y-8">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-2xl font-bold">
                <EditableText
                  value={aboutInfo.labels.resumeTitle}
                  onChange={(value) => updateLabels({ resumeTitle: value })}
                  storageKey="label-resume-title"
                />
              </h2>
              <span className="text-xs text-muted-foreground">
                <EditableText
                  value={aboutInfo.resumeCaption}
                  onChange={(value) =>
                    updateAboutInfo("resumeCaption", value)
                  }
                  storageKey="resume-caption"
                  multiline
                />
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* 학력 + 경험 */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <EditableText
                        value={aboutInfo.labels.educationTitle}
                        onChange={(value) =>
                          updateLabels({ educationTitle: value })
                        }
                        storageKey="label-education-title"
                      />
                    </h3>
                    {isEditMode && (
                      <button
                        onClick={addEducation}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                      >
                        <Plus className="w-3 h-3" />
                        추가
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {aboutInfo.resume.education.map((edu, idx) => (
                      <Card
                        key={idx}
                        className="border bg-card/60 relative"
                      >
                        <CardContent className="p-4 space-y-1">
                          {isEditMode && (
                            <button
                              onClick={() => removeEducation(idx)}
                              className={COMMON_STYLES.deleteButton}
                            >
                              <X className={COMMON_STYLES.deleteIcon} />
                            </button>
                          )}
                          <p className="text-xs text-primary font-medium">
                            <EditableText
                              value={edu.period}
                              onChange={(value) =>
                                updateResume(
                                  "education",
                                  idx,
                                  "period",
                                  value,
                                )
                              }
                              storageKey={`resume-edu-${idx}-period`}
                            />
                          </p>
                          <p className="text-sm font-semibold">
                            <EditableText
                              value={edu.title}
                              onChange={(value) =>
                                updateResume("education", idx, "title", value)
                              }
                              storageKey={`resume-edu-${idx}-title`}
                            />
                          </p>
                          <p className="text-xs text-muted-foreground">
                            <EditableText
                              value={edu.subtitle || ""}
                              onChange={(value) =>
                                updateResume(
                                  "education",
                                  idx,
                                  "subtitle",
                                  value,
                                )
                              }
                              storageKey={`resume-edu-${idx}-subtitle`}
                              multiline
                            />
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <h3 className="text-lg font-semibold mb-0 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <EditableText
                        value={aboutInfo.labels.experienceTitle}
                        onChange={(value) =>
                          updateLabels({ experienceTitle: value })
                        }
                        storageKey="label-experience-title"
                      />
                    </h3>
                    {isEditMode && (
                      <button
                        onClick={addExperience}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                      >
                        <Plus className="w-3 h-3" />
                        추가
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {aboutInfo.resume.experience.map((exp, idx) => (
                      <Card
                        key={idx}
                        className="border bg-card/60 relative"
                      >
                        <CardContent className="p-4 space-y-1">
                          {isEditMode && (
                            <button
                              onClick={() => removeExperience(idx)}
                              className={COMMON_STYLES.deleteButton}
                            >
                              <X className={COMMON_STYLES.deleteIcon} />
                            </button>
                          )}
                          <p className="text-xs text-primary font-medium">
                            <EditableText
                              value={exp.period}
                              onChange={(value) =>
                                updateResume(
                                  "experience",
                                  idx,
                                  "period",
                                  value,
                                )
                              }
                              storageKey={`resume-exp-${idx}-period`}
                            />
                          </p>
                          <p className="text-sm font-semibold">
                            <EditableText
                              value={exp.title}
                              onChange={(value) =>
                                updateResume("experience", idx, "title", value)
                              }
                              storageKey={`resume-exp-${idx}-title`}
                            />
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <EditableText
                              value={exp.description || ""}
                              onChange={(value) =>
                                updateResume(
                                  "experience",
                                  idx,
                                  "description",
                                  value,
                                )
                              }
                              storageKey={`resume-exp-${idx}-desc`}
                              multiline
                            />
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* 활동 + 자격 */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      <EditableText
                        value={aboutInfo.labels.activityTitle}
                        onChange={(value) =>
                          updateLabels({ activityTitle: value })
                        }
                        storageKey="label-activity-title"
                      />
                    </h3>
                    {isEditMode && (
                      <button
                        onClick={addActivity}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                      >
                        <Plus className="w-3 h-3" />
                        활동 추가
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {aboutInfo.resume.activities.map((act, idx) => (
                      <Card
                        key={idx}
                        className="border bg-card/60 relative"
                      >
                        <CardContent className="p-4 space-y-1">
                          {isEditMode && (
                            <button
                              onClick={() => removeActivity(idx)}
                              className={COMMON_STYLES.deleteButton}
                            >
                              <X className={COMMON_STYLES.deleteIcon} />
                            </button>
                          )}
                          <p className="text-xs text-primary font-medium">
                            <EditableText
                              value={act.period}
                              onChange={(value) =>
                                updateResume(
                                  "activities",
                                  idx,
                                  "period",
                                  value,
                                )
                              }
                              storageKey={`resume-act-${idx}-period`}
                            />
                          </p>
                          <p className="text-sm font-semibold">
                            <EditableText
                              value={act.title}
                              onChange={(value) =>
                                updateResume(
                                  "activities",
                                  idx,
                                  "title",
                                  value,
                                )
                              }
                              storageKey={`resume-act-${idx}-title`}
                            />
                          </p>
                          <ul className="mt-1 space-y-1 text-xs text-muted-foreground list-disc list-inside">
                            {act.details.map((d, dIdx) => (
                              <li
                                key={dIdx}
                                className="flex items-start gap-1"
                              >
                                <div className="flex-1">
                                  <EditableText
                                    value={d}
                                    onChange={(value) =>
                                      updateResume(
                                        "activities",
                                        idx,
                                        "details",
                                        value,
                                        dIdx,
                                      )
                                    }
                                    storageKey={`resume-act-${idx}-detail-${dIdx}`}
                                    multiline
                                  />
                                </div>
                                {isEditMode && (
                                  <button
                                    onClick={() =>
                                      removeActivityDetail(idx, dIdx)
                                    }
                                    className="text-[10px] text-muted-foreground hover:text-destructive ml-1"
                                  >
                                    삭제
                                  </button>
                                )}
                              </li>
                            ))}
                          </ul>
                          {isEditMode && (
                            <button
                              onClick={() => addActivityDetail(idx)}
                              className="mt-2 inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/40 text-primary hover:bg-primary/5"
                            >
                              <Plus className="w-3 h-3" />
                              내용 추가
                            </button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      <EditableText
                        value={aboutInfo.labels.certificateTitle}
                        onChange={(value) =>
                          updateLabels({ certificateTitle: value })
                        }
                        storageKey="label-certificate-title"
                      />
                    </h3>
                    {isEditMode && (
                      <button
                        onClick={addCertificate}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                      >
                        <Plus className="w-3 h-3" />
                        추가
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 text-xs">
                    {aboutInfo.resume.certificates.map((cert, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 relative"
                      >
                        {isEditMode && (
                          <button
                            onClick={() => removeCertificate(idx)}
                            className={COMMON_STYLES.deleteButton}
                          >
                            <X className={COMMON_STYLES.deleteIcon} />
                          </button>
                        )}
                        <span className="w-24 text-primary">
                          <EditableText
                            value={cert.date}
                            onChange={(value) =>
                              updateResume(
                                "certificates",
                                idx,
                                "date",
                                value,
                              )
                            }
                            storageKey={`resume-cert-${idx}-date`}
                          />
                        </span>
                        <span className="flex-1">
                          <EditableText
                            value={cert.name}
                            onChange={(value) =>
                              updateResume(
                                "certificates",
                                idx,
                                "name",
                                value,
                              )
                            }
                            storageKey={`resume-cert-${idx}-name`}
                            multiline
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 🎯 관심 분야 + 모토/글귀 */}
          {aboutInfo.interests.length > 0 && (
            <div className="space-y-3">
              {/* 관심 분야 태그 */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">
                    <EditableText
                      value={aboutInfo.labels.interestsTitle}
                      onChange={(value) =>
                        updateLabels({ interestsTitle: value })
                      }
                      storageKey="label-interests-title"
                    />
                  </h2>
                </div>
                {isEditMode && (
                  <button
                    onClick={addInterest}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-3 h-3" />
                    태그 추가
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {aboutInfo.interests.map((i, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary inline-flex items-center gap-1"
                  >
                    <EditableText
                      value={i}
                      onChange={(value) => {
                        const newInterests = [...aboutInfo.interests]
                        newInterests[idx] = value
                        updateAboutInfo("interests", newInterests)
                      }}
                      storageKey={`interest-${idx}`}
                    />
                    {isEditMode && (
                      <button
                        onClick={() => removeInterest(idx)}
                        className="text-[10px] text-primary/70 hover:text-destructive ml-1"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {/* 모토 / 글귀 */}
              <div className="mt-4 space-y-1">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">
                    <EditableText
                      value={aboutInfo.labels.interestMottoTitle}
                      onChange={(value) =>
                        updateLabels({ interestMottoTitle: value })
                      }
                      storageKey="label-interest-motto-title"
                    />
                  </p>
                </div>
                <p className="text-xs text-muted-foreground ml-6">
                  <EditableText
                    value={aboutInfo.interestMotto}
                    onChange={(value) =>
                      updateAboutInfo("interestMotto", value)
                    }
                    storageKey="interest-motto"
                    multiline
                  />
                </p>
              </div>
            </div>
          )}

          {/* 📌 타임라인 */}
          {aboutInfo.timeline.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">
                    <EditableText
                      value={aboutInfo.labels.timelineTitle}
                      onChange={(value) =>
                        updateLabels({ timelineTitle: value })
                      }
                      storageKey="label-timeline-title"
                    />
                  </h2>
                </div>
                {isEditMode && (
                  <button
                    onClick={addTimelineItem}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-3 h-3" />
                    항목 추가
                  </button>
                )}
              </div>
              <div className="relative pl-4 border-l border-border/60 space-y-4">
                {aboutInfo.timeline.map((t, idx) => (
                  <div key={idx} className="relative pl-4">
                    {isEditMode && (
                      <button
                        onClick={() => removeTimelineItem(idx)}
                        className={COMMON_STYLES.deleteButton}
                      >
                        <X className={COMMON_STYLES.deleteIcon} />
                      </button>
                    )}
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-background border border-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-xs text-primary font-medium">
                      <EditableText
                        value={t.period}
                        onChange={(value) => {
                          const newT = [...aboutInfo.timeline]
                          newT[idx].period = value
                          updateAboutInfo("timeline", newT)
                        }}
                        storageKey={`timeline-${idx}-period`}
                      />
                    </p>
                    <p className="text-sm font-semibold">
                      <EditableText
                        value={t.title}
                        onChange={(value) => {
                          const newT = [...aboutInfo.timeline]
                          newT[idx].title = value
                          updateAboutInfo("timeline", newT)
                        }}
                        storageKey={`timeline-${idx}-title`}
                      />
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <EditableText
                        value={t.description}
                        onChange={(value) => {
                          const newT = [...aboutInfo.timeline]
                          newT[idx].description = value
                          updateAboutInfo("timeline", newT)
                        }}
                        storageKey={`timeline-${idx}-desc`}
                        multiline
                      />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 📚 수강 과목 & 학습 주제 */}
          {aboutInfo.courses.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">
                    <EditableText
                      value={aboutInfo.labels.coursesTitle}
                      onChange={(value) =>
                        updateLabels({ coursesTitle: value })
                      }
                      storageKey="label-courses-title"
                    />
                  </h2>
                </div>
                {isEditMode && (
                  <button
                    onClick={addCourse}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-3 h-3" />
                    과목 추가
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aboutInfo.courses.map((c, idx) => (
                  <Card
                    key={idx}
                    className="border bg-card/60 relative overflow-visible"
                  >
                    <CardContent className="p-4 space-y-1">
                      {isEditMode && (
                        <button
                          onClick={() => removeCourse(idx)}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}
                      <p className="text-sm font-semibold">
                        <EditableText
                          value={c.name}
                          onChange={(value) => {
                            const newC = [...aboutInfo.courses]
                            newC[idx].name = value
                            updateAboutInfo("courses", newC)
                          }}
                          storageKey={`course-${idx}-name`}
                        />
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <EditableText
                          value={c.detail}
                          onChange={(value) => {
                            const newC = [...aboutInfo.courses]
                            newC[idx].detail = value
                            updateAboutInfo("courses", newC)
                          }}
                          storageKey={`course-${idx}-detail`}
                          multiline
                        />
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* 함께한 사람들이 본 나 (Testimonials) */}
          {aboutInfo.testimonials.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <EditableText
                    value={aboutInfo.labels.testimonialTitle}
                    onChange={(value) =>
                      updateLabels({ testimonialTitle: value })
                    }
                    storageKey="label-testimonial-title"
                  />
                </h2>
                {isEditMode && (
                  <button
                    onClick={addTestimonial}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-3 h-3" />
                    카드 추가
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aboutInfo.testimonials.map((t, idx) => (
                  <Card
                    key={idx}
                    className="border bg-card/70 shadow-sm hover:shadow-md transition-shadow relative"
                  >
                    <CardContent className="p-4 space-y-2">
                      {isEditMode && (
                        <button
                          onClick={() => removeTestimonial(idx)}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}
                      <p className="text-xs text-muted-foreground leading-relaxed italic">
                        <EditableText
                          value={t.quote}
                          onChange={(value) => {
                            const newT = [...aboutInfo.testimonials]
                            newT[idx].quote = value
                            updateAboutInfo("testimonials", newT)
                          }}
                          storageKey={`testimonial-${idx}-quote`}
                          multiline
                        />
                      </p>
                      <p className="text-xs font-semibold">
                        <EditableText
                          value={t.name}
                          onChange={(value) => {
                            const newT = [...aboutInfo.testimonials]
                            newT[idx].name = value
                            updateAboutInfo("testimonials", newT)
                          }}
                          storageKey={`testimonial-${idx}-name`}
                        />
                        <span className="text-[11px] text-muted-foreground ml-1">
                          <EditableText
                            value={t.role}
                            onChange={(value) => {
                              const newT = [...aboutInfo.testimonials]
                              newT[idx].role = value
                              updateAboutInfo("testimonials", newT)
                            }}
                            storageKey={`testimonial-${idx}-role`}
                          />
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Life & Moments 사진 갤러리 */}
          {aboutInfo.lifePhotos.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">
                    <EditableText
                      value={aboutInfo.labels.lifeMomentsTitle}
                      onChange={(value) =>
                        updateLabels({ lifeMomentsTitle: value })
                      }
                      storageKey="label-life-moments-title"
                    />
                  </h2>
                </div>
                {isEditMode && (
                  <button
                    onClick={addLifePhoto}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-3 h-3" />
                    사진 추가
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aboutInfo.lifePhotos.map((p, idx) => (
                  <Card
                    key={idx}
                    className="border bg-card/70 overflow-hidden relative"
                  >
                    <div className="w-full h-40 bg-muted">
                      <EditableMedia
                        src={p.image}
                        onChange={(src) => {
                          const newPhotos = [...aboutInfo.lifePhotos]
                          newPhotos[idx].image = src
                          updateAboutInfo("lifePhotos", newPhotos)
                        }}
                        type="image"
                        storageKey={`life-photo-${idx}`}
                        className="w-full h-full object-cover"
                        alt={p.caption}
                        purpose={`life-photo-${idx}`}
                      />
                    </div>
                    <CardContent className="p-3">
                      {isEditMode && (
                        <button
                          onClick={() => removeLifePhoto(idx)}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}
                      <p className="text-xs text-muted-foreground text-center">
                        <EditableText
                          value={p.caption}
                          onChange={(value) => {
                            const newPhotos = [...aboutInfo.lifePhotos]
                            newPhotos[idx].caption = value
                            updateAboutInfo("lifePhotos", newPhotos)
                          }}
                          storageKey={`life-photo-${idx}-caption`}
                          multiline
                        />
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Projects 섹션 */}
          <section id="projects" className="space-y-6">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-primary" />
                  <EditableText
                    value={aboutInfo.labels.projectsTitle}
                    onChange={(value) =>
                      updateLabels({ projectsTitle: value })
                    }
                    storageKey="label-projects-title"
                  />
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  <EditableText
                    value={aboutInfo.projectsCaption}
                    onChange={(value) =>
                      updateAboutInfo("projectsCaption", value)
                    }
                    storageKey="projects-caption"
                    multiline
                  />
                </p>
              </div>
              {isEditMode && (
                <button
                  onClick={addProject}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border border-dashed border-primary/50 text-primary hover:bg-primary/5"
                >
                  <Plus className="w-3 h-3" />
                  프로젝트 추가
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aboutInfo.projects.map((project, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg relative overflow-hidden flex flex-col"
                >
                  <CardContent className="p-5 flex flex-col gap-4">
                    {isEditMode && (
                      <button
                        onClick={() => removeProject(index)}
                        className={COMMON_STYLES.deleteButton}
                      >
                        <X className={COMMON_STYLES.deleteIcon} />
                      </button>
                    )}

                    {/* 표지 이미지 업로드 */}
                    <div className="w-full h-40 rounded-xl overflow-hidden bg-muted">
                      <EditableMedia
                        src={project.coverImage}
                        onChange={(src) =>
                          updateProject(index, "coverImage", src)
                        }
                        type="image"
                        storageKey={`project-${index}-cover`}
                        className="w-full h-full object-cover"
                        alt={`${project.title} 표지 이미지`}
                        purpose={`project-cover-${index}`}
                      />
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-primary font-medium">
                        <EditableText
                          value={project.period}
                          onChange={(value) =>
                            updateProject(index, "period", value)
                          }
                          storageKey={`project-${index}-period`}
                        />
                      </p>
                      <h3 className="text-base font-semibold flex items-center gap-2">
                        <EditableText
                          value={project.title}
                          onChange={(value) =>
                            updateProject(index, "title", value)
                          }
                          storageKey={`project-${index}-title`}
                        />
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <EditableText
                          value={project.description}
                          onChange={(value) =>
                            updateProject(index, "description", value)
                          }
                          storageKey={`project-${index}-desc`}
                          multiline
                        />
                      </p>
                    </div>

                    {/* 태그 */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-full text-[11px] bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {isEditMode && (
                      <div className="text-[11px] text-muted-foreground space-y-1">
                        <span>
                          <EditableText
                            value={aboutInfo.labels.projectTagsLabel}
                            onChange={(value) =>
                              updateLabels({ projectTagsLabel: value })
                            }
                            storageKey="label-project-tags"
                          />
                        </span>
                        <EditableText
                          value={project.tags.join(" ")}
                          onChange={(value) =>
                            updateProjectTags(index, value)
                          }
                          storageKey={`project-${index}-tags`}
                        />
                      </div>
                    )}

                    {/* PDF 링크 (외부 링크 포함) */}
                    <div className="pt-2 border-t border-border/60 mt-2 flex flex-col gap-2">
                      {project.pdfUrl && (
                        <a
                          href={project.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <FileText className="w-4 h-4" />
                          {project.pdfName || "PDF 열기"}
                        </a>
                      )}

                      {isEditMode && (
                        <div className="text-[11px] text-muted-foreground space-y-1">
                          <p className="font-medium">PDF / 링크 정보</p>
                          <div className="space-y-1">
                            <div className="flex flex-col gap-1">
                              <span>표시할 파일 이름 (예: 고덕동 분석 리포트)</span>
                              <EditableText
                                value={project.pdfName}
                                onChange={(value) =>
                                  updateProject(index, "pdfName", value)
                                }
                                storageKey={`project-${index}-pdfName`}
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <span>PDF 또는 외부 링크 URL</span>
                              <EditableText
                                value={project.pdfUrl}
                                onChange={(value) =>
                                  updateProject(index, "pdfUrl", value)
                                }
                                storageKey={`project-${index}-pdfUrl`}
                                multiline
                              />
                            </div>
                          </div>
                          <p className="text-[10px] mt-1">
                            <EditableText
                              value={aboutInfo.labels.projectPdfNote}
                              onChange={(value) =>
                                updateLabels({ projectPdfNote: value })
                              }
                              storageKey="label-project-pdf-note"
                              multiline
                            />
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </section>
    </EditableBackground>
  )
}
