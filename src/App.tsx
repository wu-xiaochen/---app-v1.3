import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { Menu, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Box, FileText, Activity, Cpu, Truck, ShieldCheck, Sliders, Download, Lightbulb, ChevronRight, AlertCircle, ClipboardList, Target, Zap, Layers, Bookmark, GitMerge, Search, Eye, Wind, TrendingUp, MessageSquare, MapPin, UserCheck, Award, Info, FileSpreadsheet, Sparkles, Check, Loader2, RefreshCw, X, Paperclip, Plus, Settings, Play, Camera, BrainCircuit, FileSearch, Users, Image as ImageIcon, LineChart as LineChartIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, LineChart, Line } from 'recharts';

type MessageType = 'user' | 'ai';
interface Message { id: string; type: MessageType; content: React.ReactNode; }

interface ScenarioState {
  noise: boolean;
  underground: boolean;
  power: boolean;
  cold: boolean;
}

const TCOTrustPopup = ({ onClose }: { onClose: () => void }) => {
  const data = [
    { name: '初期投入', low: 100, smart: 115 },
    { name: '3年运维', low: 60, smart: 20 },
    { name: '故障风险', low: 40, smart: 5 },
    { name: '总成本', low: 200, smart: 140 },
  ];

  return (
    <div className="fixed inset-0 bg-blue-900/50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-blue-50/30">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-600" />
            <h3 className="font-bold text-gray-800">精明在哪？—— TCO 总成本分析</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-600 mb-4">基于您的<span className="text-blue-600 font-bold">极寒工况</span>，智慧方案虽然初期成本略高，但通过规避冻裂风险和降低维保频率，3年内可为您节省约 <span className="text-blue-600 font-bold">30%</span> 的总支出。</p>
          
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Bar dataKey="low" name="低价低标方案" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="smart" name="智慧建议方案" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 bg-blue-50 p-3 rounded-xl border border-blue-100">
            <div className="text-[10px] text-blue-800 font-medium flex items-center gap-1">
              <CheckCircle size={12} /> 结论：预计 14 个月即可收回溢价成本
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50">
          <ButtonSolid onClick={onClose}>我明白了，按智慧方案执行</ButtonSolid>
        </div>
      </motion.div>
    </div>
  );
};

const RequirementRadarChart = () => {
  const data = [
    { subject: '描述完整度', A: 95, fullMark: 100 },
    { subject: '场景匹配度', A: 98, fullMark: 100 },
    { subject: '成本最优性', A: 92, fullMark: 100 },
    { subject: '技术可靠性', A: 96, fullMark: 100 },
    { subject: '合规安全性', A: 100, fullMark: 100 },
  ];

  return (
    <div className="h-48 w-full my-2">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#64748b' }} />
          <Radar name="需求健康度" dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.5} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

const Accordion = ({ title, count, children, defaultOpen = false, warning = false }: { title: string, count?: number, children: React.ReactNode, defaultOpen?: boolean, warning?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-100 rounded-lg mb-2 overflow-hidden bg-white">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-2 text-xs font-medium text-gray-800 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-2">
          {isOpen ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
          <span>{title} {count !== undefined && <span className="text-gray-500 font-normal">({count})</span>}</span>
        </div>
        {warning && <AlertTriangle size={14} className="text-orange-500" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-3 pb-3 pt-1 text-xs text-gray-600 border-t border-gray-50">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden ${className}`}>{children}</div>
);

const ButtonOutline = ({ children, onClick, className = '', color = 'blue' }: { children: React.ReactNode, onClick?: () => void, className?: string, color?: 'blue' | 'red' | 'blue' | 'green' }) => {
  let colorClasses = 'border-blue-500 text-blue-500 hover:bg-blue-50';
  if (color === 'red') colorClasses = 'border-red-400 text-red-500 hover:bg-red-50';
  if (color === 'blue') colorClasses = 'border-blue-500 text-blue-500 hover:bg-blue-50';
  if (color === 'green') colorClasses = 'border-blue-400 text-blue-600 hover:bg-blue-50';
  return <button onClick={onClick} className={`px-3 py-1 text-xs rounded border ${colorClasses} transition-colors flex items-center gap-1 ${className}`}>{children}</button>;
};

const ButtonSolid = ({ children, onClick, className = '', disabled = false }: { children: React.ReactNode, onClick?: () => void, className?: string, disabled?: boolean }) => (
  <button onClick={onClick} disabled={disabled} className={`w-full py-2 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'} ${className}`}>{children}</button>
);

const ReasoningBlock = ({ title, logic, scenario, knowledge, result, content, status }: { title: string, logic?: string, scenario?: string, knowledge?: string, result?: string, content?: string, status?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-2 mb-3">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-1 text-[9px] text-blue-500 hover:text-blue-700 font-medium transition-colors"
      >
        <Search size={10} />
        <span>{isOpen ? '收起推演过程' : `查看“${title}”推演过程`}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-1 p-2 bg-gray-50 border-l-2 border-blue-400 rounded-r-md text-[9px] space-y-1.5">
              {content ? (
                <div className="text-gray-700 leading-relaxed">{content}</div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <span className="text-gray-400 shrink-0 w-12 text-right">业务场景:</span>
                    <span className="text-gray-700">{scenario || '老旧小区改造，空间狭小，冬季严寒'}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-400 shrink-0 w-12 text-right">专家知识:</span>
                    <span className="text-gray-700">{knowledge || '《城镇燃气设计规范》GB50028，极寒工况防冻冗余标准'}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-400 shrink-0 w-12 text-right">能力推导:</span>
                    <span className="text-blue-700 font-medium">{result || '建议配置智能防爆电伴热，确保-20℃下不结冰'}</span>
                  </div>
                  {logic && (
                    <div className="pt-1 border-t border-gray-200 text-gray-500 italic">
                      推导逻辑：{logic}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PreJourneyCard = ({ onConfirm }: { onConfirm: () => void }) => (
  <Card className="mt-2 border-blue-100 shadow-sm">
    <div className="p-2 border-b border-blue-50 flex justify-between items-start bg-blue-50/50">
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Activity size={12} /></div>
        <span className="font-semibold text-gray-800 text-xs">智能业务进程识别</span>
      </div>
    </div>
    <div className="p-2">
      <p className="text-[10px] text-gray-600 mb-2 leading-relaxed">
        基于您的项目台账与历史业务行为，需智已提前预测您的业务意图：
      </p>
      
      <div className="bg-white border border-gray-100 rounded-lg p-2 mb-2 space-y-1.5 shadow-sm">
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-gray-500 w-14">关联项目:</span>
          <span className="text-gray-800 font-medium">城南老旧小区改造二期工程</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-gray-500 w-14">历史偏好:</span>
          <span className="text-gray-800">高可靠性、对客诉敏感</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-gray-500 w-14">环境标签:</span>
          <div className="flex gap-1">
            <span className="text-blue-600 bg-blue-50 px-1 py-0.5 rounded text-[9px]">即将入冬</span>
            <span className="text-blue-600 bg-blue-50 px-1 py-0.5 rounded text-[9px]">空间受限</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 mb-2">
        <div className="text-[10px] font-semibold text-blue-800 mb-0.5 flex items-center gap-1">
          <Target size={10} /> 预测核心业务需求
        </div>
        <div className="text-[10px] text-blue-700">
          物资：<span className="font-bold">燃气调压箱及配套防冻物资</span><br/>
          数量：<span className="font-bold">约 10 台</span>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-lg p-2 mb-3">
        <div className="text-[10px] font-semibold text-orange-800 mb-0.5 flex items-center gap-1">
          <AlertTriangle size={10} /> 潜在业务风险提示
        </div>
        <div className="text-[10px] text-orange-800 leading-relaxed">
          老旧小区改造通常伴随<span className="font-bold">空间狭小</span>和<span className="font-bold">居民扰民投诉</span>风险。建议在后续参数定义中重点关注【设备尺寸】与【运行噪音】。
        </div>
      </div>

      <ButtonSolid onClick={onConfirm} className="w-full bg-blue-600 hover:bg-blue-700 py-1.5 text-[11px]">确认预测，补充具体诉求</ButtonSolid>
    </div>
  </Card>
);

const ProjectBackgroundCard = () => (
  <Card className="mt-2 border-blue-100 shadow-sm bg-gradient-to-br from-blue-50/30 to-white">
    <div className="p-3">
      <div className="flex items-center gap-2 text-[11px] font-black text-blue-800 mb-3 uppercase tracking-widest">
        <MapPin size={14} /> 项目背景画像
      </div>
      <div className="flex flex-wrap gap-2">
        {[
          { label: '项目名称', value: '城南老旧小区改造二期' },
          { label: '建筑类型', value: '高层集中供暖' },
          { label: '管网位置', value: '管网末端' },
          { label: '极端气温', value: '冬季平均 -5°C' },
          { label: '改造规模', value: '1500 户' }
        ].map(tag => (
          <div key={tag.label} className="flex items-center bg-white border border-blue-100 rounded-lg px-2 py-1 shadow-sm">
            <span className="text-[9px] text-gray-400 font-bold mr-1.5">{tag.label}:</span>
            <span className="text-[10px] text-blue-700 font-black">{tag.value}</span>
          </div>
        ))}
      </div>
    </div>
  </Card>
);

const BOMAnalysisCard = ({ onConfirm, isAuto }: { onConfirm: () => void, isAuto?: boolean }) => (
  <Card className="mt-2 border-blue-100 shadow-lg overflow-hidden">
    <div className="p-4 bg-blue-900 text-white">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
          <Zap size={14} className="text-blue-100" />
        </div>
        <span className="font-bold text-sm tracking-tight">业务解析：BOM 清单深度解析</span>
      </div>
      <p className="text-[12px] leading-relaxed font-medium text-blue-50">
        “我已深度解析您的《管网配套BOM清单》，共识别 <span className="text-blue-300 font-bold">45</span> 项物资。我将基于<span className="text-white font-bold underline decoration-blue-300/50 underline-offset-4 mx-0.5">项目全局工况</span>，为您自动对冲隐性风险，并锁定核心能力标尺。”
      </p>
    </div>

    <div className="p-3 border-b border-blue-50 bg-white">
      <div className="flex items-center gap-2">
        <Layers size={12} className="text-blue-600" />
        <span className="font-bold text-gray-800 text-[11px]">行业专家知识模型解析结果</span>
      </div>
    </div>

    <div className="p-3 space-y-2">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-2.5">
        <div className="flex items-center justify-between mb-1">
          <div className="text-[10px] font-bold text-blue-800 flex items-center gap-1">
            <CheckCircle size={12} /> 标准品清单 (38项)
          </div>
          <span className="text-[8px] text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded font-bold">已自动锁定，免决策</span>
        </div>
        <p className="text-[9px] text-blue-700 leading-relaxed">
          包含：无缝钢管、PE管、标准法兰等。系统已自动匹配 <span className="font-bold">GB/T 国家标准</span>。针对管材等重货，<span className="font-bold text-blue-800">建议优先考虑本地供应以规避高昂物流成本</span>。
        </p>
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-lg p-2.5">
        <div className="text-[10px] font-bold text-orange-800 mb-1 flex items-center gap-1">
          <AlertTriangle size={12} /> 业务逻辑规则审查 (发现 1 处冲突)
        </div>
        <p className="text-[9px] text-orange-800 leading-relaxed">
          <span className="font-bold">压力等级不匹配：</span>清单中【平焊法兰(PN1.6)】与【切断阀(PN2.5)】冲突。
          <span className="block mt-1 text-orange-600 font-bold">💡 专家建议：已为您自动升档法兰至 PN2.5 以确保系统安全性。</span>
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-2.5">
        <div className="flex items-center justify-between mb-1">
          <div className="text-[10px] font-bold text-blue-800 flex items-center gap-1">
            <Target size={12} /> 核心风险件 (7项)
          </div>
          <span className="text-[8px] text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded font-bold">需深度定义能力</span>
        </div>
        <p className="text-[9px] text-blue-700 leading-relaxed">
          包含：<span className="font-bold">燃气调压箱</span>、智能流量计等。此类物资受工况影响大，需进一步映射业务能力。
        </p>
      </div>

      {!isAuto && (
        <ButtonSolid onClick={onConfirm} className="w-full bg-blue-600 hover:bg-blue-700 py-2 mt-2 text-[11px] font-bold">确认解析结果，进入场景定义</ButtonSolid>
      )}
    </div>
  </Card>
);

const ChatPromptHouseholds = ({ onSelect }: { onSelect: (val: string) => void }) => {
  const [selected, setSelected] = useState(false);
  return (
    <div>
      <p className="text-sm mb-2">收到！为老旧小区改造需求 10 台燃气调压箱。作为您的业务辅助大脑，我已调取《城镇燃气设计规范》。为了帮您精准推算设备能力，请问<strong>每个调压箱大约覆盖多少户居民</strong>？</p>
      {!selected && (
        <div className="flex gap-2 mt-2">
          <ButtonOutline color="blue" onClick={() => { setSelected(true); onSelect("约300户"); }}>约300户</ButtonOutline>
          <ButtonOutline color="blue" onClick={() => { setSelected(true); onSelect("约500户"); }}>约500户</ButtonOutline>
        </div>
      )}
    </div>
  );
};

const ChatPromptUsage = ({ onSelect }: { onSelect: (val: string) => void }) => {
  const [selected, setSelected] = useState(false);
  return (
    <div>
      <p className="text-sm mb-2">好的。基于行业专家知识模型，<strong>用气场景</strong>会直接影响供能能力的测算。请问这些居民是<strong>仅做饭</strong>，还是<strong>做饭+壁挂炉采暖</strong>？</p>
      {!selected && (
        <div className="flex gap-2 mt-2">
          <ButtonOutline color="blue" onClick={() => { setSelected(true); onSelect("仅做饭"); }}>仅做饭</ButtonOutline>
          <ButtonOutline color="blue" onClick={() => { setSelected(true); onSelect("做饭+采暖"); }}>做饭+采暖</ButtonOutline>
        </div>
      )}
    </div>
  );
};

const ChatPromptBusiness1 = ({ onSelect }: { onSelect: (val: string) => void }) => {
  const [selected, setSelected] = useState(false);
  return (
    <div>
      <p className="text-sm mb-2">了解。老旧小区改造通常空间有限，请问<strong>安装位置</strong>主要在哪里？</p>
      {!selected && (
        <div className="flex gap-2 mt-2">
          <ButtonOutline color="blue" onClick={() => { setSelected(true); onSelect("绿化带/空地"); }}>绿化带/空地</ButtonOutline>
          <ButtonOutline color="blue" onClick={() => { setSelected(true); onSelect("靠近居民楼外墙"); }}>靠近居民楼外墙</ButtonOutline>
        </div>
      )}
    </div>
  );
};

const ChatPromptBusiness2 = ({ onSelect }: { onSelect: (val: string) => void }) => {
  const [selected, setSelected] = useState(false);
  return (
    <div>
      <p className="text-sm mb-2">好的。考虑到您提到“最近冬天老降温，怕冻坏了影响供气”，请问该地区<strong>冬季最低气温</strong>大约是多少？</p>
      {!selected && (
        <div className="flex gap-2 mt-2">
          <ButtonOutline color="blue" onClick={() => { setSelected(true); onSelect("0℃以上"); }}>0℃以上</ButtonOutline>
          <ButtonOutline color="blue" onClick={() => { setSelected(true); onSelect("-10℃左右"); }}>-10℃左右</ButtonOutline>
          <ButtonOutline color="blue" onClick={() => { setSelected(true); onSelect("-20℃及以下"); }}>-20℃及以下</ButtonOutline>
        </div>
      )}
    </div>
  );
};

const Step1ConfirmCard = ({ households, usage, business1, business2, onConfirm }: { households: string, usage: string, business1: string, business2: string, onConfirm: () => void }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [showTCO, setShowTCO] = useState(false);
  const [viewMode, setViewMode] = useState<'business' | 'technical'>('business');
  
  const flowRateValue = usage === "做饭+采暖" ? (households === "约500户" ? 2000 : 1200) : (households === "约500户" ? 1000 : 600);
  const householdsCount = households === "约500户" ? 500 : 300;
  const capabilityDesc = usage === "做饭+采暖" ? `满足 ${householdsCount} 户居民冬季高峰期采暖与烹饪供能` : `满足 ${householdsCount} 户居民日常烹饪供能`;

  return (
    <Card className="mt-2 border-blue-100 shadow-md overflow-hidden">
      {showTCO && <TCOTrustPopup onClose={() => setShowTCO(false)} />}
      
      {/* 意图共鸣卡片头部 */}
      <div className="relative p-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
        {/* 背景波纹动画 */}
        <div className="absolute inset-0 opacity-20">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border border-white rounded-full"
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
            />
          ))}
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Zap size={14} className="text-blue-100" />
            </div>
            <span className="font-bold text-sm tracking-tight">初步需求确认：我已精准捕捉您的核心诉求</span>
          </div>
          
          <p className="text-[12px] leading-relaxed font-medium text-blue-50">
            “我已捕捉到您的核心关注点：解决<span className="text-blue-300 font-bold underline decoration-blue-300/50 underline-offset-4 mx-0.5">老旧小区</span>环境下，因冬季极寒导致的<span className="text-blue-300 font-bold underline decoration-blue-300/50 underline-offset-4 mx-0.5">供气中断风险</span>。为此，我将重点强化<span className="text-white font-bold mx-0.5">‘防冻冗余’</span>与<span className="text-white font-bold mx-0.5">‘模块化安装’</span>能力。”
          </p>
        </div>
      </div>

      <div className="p-3 border-b border-blue-50 flex flex-wrap items-center justify-between gap-2 bg-white">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-800 text-[11px]">逻辑预判与能力映射</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setShowTCO(true)} className="text-[10px] text-blue-600 font-medium hover:underline flex items-center gap-0.5">
            <TrendingUp size={10} /> 精明在哪？
          </button>
          <div className="flex bg-gray-100 rounded-md p-0.5">
            <button onClick={() => setViewMode('business')} className={`px-2 py-0.5 text-[9px] rounded ${viewMode === 'business' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}>业务</button>
            <button onClick={() => setViewMode('technical')} className={`px-2 py-0.5 text-[9px] rounded ${viewMode === 'technical' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}>技术</button>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-2 text-[10px]">
        {viewMode === 'business' ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center"><span className="text-gray-500">核心供能能力:</span><span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-bold">{capabilityDesc}</span></div>
            <ReasoningBlock 
              title="供能能力" 
              scenario={`${households}居民，${usage}场景`}
              knowledge="根据《城镇燃气设计规范》，采暖户均流量取值远高于仅烹饪户。"
              result={`推算瞬时流量峰值，确保${householdsCount}户同时用气不降压。`}
            />
            <div className="flex justify-between items-center"><span className="text-gray-500">适用管网压力:</span><span className="text-gray-800">城市中压管网接入</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">终端输出压力:</span><span className="text-gray-800">民用标准低压输出</span></div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between items-center"><span className="text-gray-500">推算流量需求:</span><span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-bold">≥ {flowRateValue} Nm³/h</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">默认进口压力:</span><span className="text-gray-800">0.2~0.4 MPa (中压A)</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">默认出口压力:</span><span className="text-gray-800">2.0 kPa (低压)</span></div>
          </div>
        )}
        
        <div className="space-y-3 mt-3">
          <div className="border-t border-gray-100 pt-2">
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">{viewMode === 'business' ? '能力需求' : '基础物资属性规格参数'}</div>
            <div className="grid grid-cols-2 gap-2">
              {viewMode === 'business' ? (
                <>
                  <div className="bg-white p-2 rounded border border-gray-100 relative overflow-hidden group">
                    <div className="text-[10px] font-bold text-gray-900">高强度结构</div>
                    <div className="text-[8px] text-gray-400">保障长期运行不形变</div>
                    <div className="absolute top-0 right-0 bg-blue-50 text-blue-600 text-[7px] px-1 py-0.5 rounded-bl font-black tracking-tighter border-l border-b border-blue-100 shadow-sm flex items-center gap-0.5">
                      <TrendingUp size={6} /> 历史数据决策: 92%
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-100 relative overflow-hidden group">
                    <div className="text-[10px] font-bold text-gray-900">极强防腐</div>
                    <div className="text-[8px] text-gray-400">适应潮湿/地下环境</div>
                    <div className="absolute top-0 right-0 bg-blue-50 text-blue-600 text-[7px] px-1 py-0.5 rounded-bl font-black tracking-tighter border-l border-b border-blue-100 shadow-sm flex items-center gap-0.5">
                      <TrendingUp size={6} /> 历史数据决策: 88%
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-100 relative overflow-hidden group">
                    <div className="text-[10px] font-bold text-gray-900">标准承压</div>
                    <div className="text-[8px] text-gray-400">符合国家燃气安全标准</div>
                    <div className="absolute top-0 right-0 bg-emerald-50 text-emerald-600 text-[7px] px-1 py-0.5 rounded-bl font-black tracking-tighter border-l border-b border-emerald-100 shadow-sm flex items-center gap-0.5">
                      <Check size={6} /> 历史数据决策: 100%
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-100 relative overflow-hidden group">
                    <div className="text-[10px] font-bold text-gray-900">全天候防护</div>
                    <div className="text-[8px] text-gray-400">无惧暴雨/沙尘工况</div>
                    <div className="absolute top-0 right-0 bg-blue-50 text-blue-600 text-[7px] px-1 py-0.5 rounded-bl font-black tracking-tighter border-l border-b border-blue-100 shadow-sm flex items-center gap-0.5">
                      <TrendingUp size={6} /> 历史数据决策: 85%
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white p-1 rounded border border-gray-100 text-[8px]"><span className="text-gray-500">材质:</span> Q235B碳钢</div>
                  <div className="bg-white p-1 rounded border border-gray-100 text-[8px]"><span className="text-gray-500">防腐:</span> 环氧树脂</div>
                  <div className="bg-white p-1 rounded border border-gray-100 text-[8px]"><span className="text-gray-500">接口:</span> DN100法兰</div>
                  <div className="bg-white p-1 rounded border border-gray-100 text-[8px]"><span className="text-gray-500">防护:</span> IP65</div>
                </>
              )}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-2">
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">特殊工况应对方案</div>
            <div className="space-y-1 text-[8px] text-gray-600 bg-white p-1.5 rounded border border-gray-100">
              {viewMode === 'business' ? (
                <>
                  <p>• <span className="font-bold text-blue-700">极寒应对：</span>自动恒温加热，防止冬季结冰停气。</p>
                  <p>• <span className="font-bold text-blue-700">静音运行：</span>高效隔音处理，不干扰周边居民休息。</p>
                </>
              ) : (
                <>
                  <p>• <span className="font-bold text-blue-700">伴热系统：</span>配套防爆电伴热，温控 5-15℃。</p>
                  <p>• <span className="font-bold text-blue-700">降噪材料：</span>内壁粘贴 20mm 阻燃隔音棉。</p>
                </>
              )}
            </div>
          </div>
        </div>

        {!confirmed && (
          <ButtonSolid className="w-full mt-2 uppercase tracking-widest" onClick={() => { setConfirmed(true); onConfirm(); }}>确认初步需求，进行需求增强</ButtonSolid>
        )}
      </div>
    </Card>
  );
};



export interface ConfigState {
  days: number;
  material: number; // Mapping to Q
  accuracy: number; // AC
  inletPressure: string; // P1
  structure: '1+1' | '2+0' | '1+0';
  materialType: 'carbon' | 'stainless';
  insulation: 'basic' | 'advanced';
  telemetry: 'basic' | 'full';
  noiseReduction: boolean;
}

const ValveComponent = ({ config }: { config: ConfigState }) => {
  const materialProps = config.materialType === 'stainless'
    ? { color: '#e2e8f0', metalness: 0.8, roughness: 0.2 } // Stainless Steel
    : { color: '#475569', metalness: 0.4, roughness: 0.6 }; // Carbon Steel

  return (
    <group position={[0, -0.5, 0]}>
      {/* Cabinet Box */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2.5, 2.5, 1.5]} />
        <meshStandardMaterial color="#94a3b8" transparent opacity={0.3} />
      </mesh>
      
      {/* Pipe Manifold */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 2.2, 32]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      
      {/* Filter */}
      <mesh position={[-0.6, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.5, 32]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
      
      {/* Regulator */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 0.5, 32]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Pressure Gauge */}
      <mesh position={[0, 0.5, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Silencer / Noise Reduction Module */}
      {config.noiseReduction && (
        <group position={[0.8, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.3, 0.5, 32]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
        </group>
      )}

      {/* Telemetry Box */}
      {config.telemetry === 'full' && (
        <group position={[0.6, 0.4, 0.4]}>
          <mesh>
            <boxGeometry args={[0.3, 0.4, 0.2]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.4]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
        </group>
      )}
    </group>
  );
};

const BOMModel = ({ type, config }: { type: string | null, config: ConfigState }) => {
  const materialProps = config.material > 50
    ? { color: '#e2e8f0', metalness: 0.8, roughness: 0.2 } // Stainless Steel
    : { color: '#475569', metalness: 0.4, roughness: 0.6 }; // Carbon Steel

  if (type === '智能流量计') {
    return (
      <group position={[0, -0.5, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.25, 0.25, 3, 32]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[0.6, 0.4, 0.6]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0, 0.6, 0.2]}>
          <boxGeometry args={[0.4, 0.2, 0.05]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
        </mesh>
      </group>
    );
  }

  if (type === '加臭机') {
    return (
      <group position={[0, -0.5, 0]}>
        <mesh>
          <boxGeometry args={[1.2, 1.8, 0.8]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0, 0, 0.41]}>
          <boxGeometry args={[0.8, 1.2, 0.05]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0.3, 0.5, 0.45]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" />
        </mesh>
      </group>
    );
  }

  // Default to Valve/Regulator
  return <ValveComponent config={config} />;
};

const Step3Card = ({ onNext }: { onNext: (config: ConfigState) => void }) => {
  const [viewMode, setViewMode] = useState<'business' | 'technical'>('business');
  const [vizMode, setVizMode] = useState<'3d' | 'image' | 'curve'>('3d');
  const [config, setConfig] = useState<ConfigState>({ 
    days: 15, 
    material: 60, 
    accuracy: 10,
    inletPressure: '0.2-0.4MPa',
    structure: '1+1',
    materialType: 'carbon',
    insulation: 'advanced', 
    telemetry: 'full', 
    noiseReduction: true 
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(true);
  const [savedConfigs, setSavedConfigs] = useState<(ConfigState & {id: string, name: string})[]>([]);

  const handleChange = (key: keyof ConfigState, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setIsCalculating(true);
    setShowResult(false);
    setTimeout(() => { setIsCalculating(false); setShowResult(true); }, 800);
  };

  const handleSaveConfig = () => {
    const name = `配置_${new Date().toLocaleTimeString()}`;
    setSavedConfigs([...savedConfigs, { ...config, id: Date.now().toString(), name }]);
  };

  const loadConfig = (c: ConfigState) => {
    setConfig({ ...c });
    setIsCalculating(true);
    setShowResult(false);
    setTimeout(() => { setIsCalculating(false); setShowResult(true); }, 500);
  };

  const initialCost = 12000 + (config.materialType === 'stainless' ? 6000 : 0) + (config.insulation === 'advanced' ? 3500 : 0) + (config.telemetry === 'full' ? 2500 : 0) + (config.noiseReduction ? 1800 : 0) + (config.structure === '1+1' ? 4000 : 0);
  const maintCost = (1500 + (config.materialType === 'stainless' ? 0 : 1800) + (config.insulation === 'advanced' ? 0 : 2500) + (config.telemetry === 'full' ? 0 : 1200)) * 5; // 5-year maintenance
  const timeCost = (30 - config.days) * 600 + (config.noiseReduction ? 0 : 5000); // Expedite risk/cost + noise complaint risk

  const maxCost = 35000; // For scaling heights
  const initialCostHeight = Math.max(10, (initialCost / maxCost) * 100);
  const maintenanceCostHeight = Math.max(10, (maintCost / maxCost) * 100);
  const timeCostHeight = Math.max(10, (timeCost / maxCost) * 100);

  // Business-centric parameter mapping
  const householdCoverage = Math.round(config.material * 15); // Just a mock mapping

  return (
    <Card className="mt-2 border-blue-100 shadow-lg">
      <div className="p-2.5 sm:p-3 border-b border-blue-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-blue-50/30">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"><Wind size={14} /></div>
          <span className="font-bold text-gray-800 text-sm">需求仿真呈现</span>
        </div>
        <div className="flex bg-white/80 backdrop-blur-sm rounded-lg p-0.5 border border-blue-100 self-end sm:self-auto">
          <button onClick={() => setViewMode('business')} className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${viewMode === 'business' ? 'bg-blue-600 shadow-sm text-white' : 'text-blue-600 hover:bg-blue-50'}`}>业务视图</button>
          <button onClick={() => setViewMode('technical')} className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${viewMode === 'technical' ? 'bg-blue-600 shadow-sm text-white' : 'text-blue-600 hover:bg-blue-50'}`}>技术视图</button>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <div className="w-full h-48 sm:h-56 bg-blue-50 rounded-xl mb-4 relative flex items-center justify-center border border-blue-100 overflow-hidden shadow-inner">
          <div className="z-10 w-full h-full">
            {vizMode === '3d' && (
              <Canvas camera={{ position: [3, 2, 4], fov: 45 }}>
                <ambientLight intensity={0.7} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <Suspense fallback={null}>
                  <Environment preset="city" />
                  <ValveComponent config={config} />
                  <ContactShadows position={[0, -1, 0]} opacity={0.6} scale={10} blur={2.5} far={4} />
                </Suspense>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>
            )}
            {vizMode === 'image' && (
              <div className="w-full h-full flex items-center justify-center bg-white">
                <img 
                  src="https://picsum.photos/seed/gas-valve/800/600" 
                  alt="实物图" 
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            {vizMode === 'curve' && (
              <div className="w-full h-full p-4 bg-white">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { time: '0', pressure: 0.4, flow: 100 },
                    { time: '1', pressure: 0.38, flow: 120 },
                    { time: '2', pressure: 0.41, flow: 110 },
                    { time: '3', pressure: 0.39, flow: 130 },
                    { time: '4', pressure: 0.4, flow: 125 },
                    { time: '5', pressure: 0.42, flow: 140 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Tooltip contentStyle={{ fontSize: '10px' }} />
                    <Line type="monotone" dataKey="pressure" stroke="#3b82f6" strokeWidth={2} dot={false} name="压力 (MPa)" />
                    <Line type="monotone" dataKey="flow" stroke="#10b981" strokeWidth={2} dot={false} name="流量 (Nm³/h)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
          <div className="absolute top-2 right-2 z-20 flex flex-col gap-1">
            <div className="bg-blue-900/50 text-white text-[8px] px-2 py-1 rounded backdrop-blur-sm border border-white/10">
              实时机理仿真：{viewMode === 'business' ? '能力映射' : '规格联动'}
            </div>
            <div className="flex bg-white/90 backdrop-blur-sm rounded-md p-0.5 border border-blue-100 shadow-sm">
              <button onClick={() => setVizMode('3d')} className={`p-1 rounded transition-all ${vizMode === '3d' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'}`} title="3D视图"><Activity size={10} /></button>
              <button onClick={() => setVizMode('image')} className={`p-1 rounded transition-all ${vizMode === 'image' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'}`} title="实物图"><ImageIcon size={10} /></button>
              <button onClick={() => setVizMode('curve')} className={`p-1 rounded transition-all ${vizMode === 'curve' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'}`} title="仿真曲线"><LineChartIcon size={10} /></button>
            </div>
          </div>
        </div>

        <div className="space-y-5 mb-6">
          <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
            <div className="text-[10px] text-blue-800 font-bold mb-1.5 flex items-center gap-1">
              <Zap size={12} /> 调整影响评估 (实时)
            </div>
            <p className="text-[10px] text-blue-700 leading-relaxed">
              {config.material > 70 
                ? '“您调高了供能覆盖规模，系统已自动将调压结构升级为 1+1（一开一备），以确保大流量下的检修不停气。”' 
                : config.materialType === 'stainless'
                ? '“您选择了不锈钢材质，系统已自动匹配 15 年免维护周期，全生命周期运维成本降低 40%。”'
                : '“当前配置处于标准均衡状态，可满足常规老旧小区改造需求。”'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-gray-700">{viewMode === 'business' ? '业务上线时效' : '交付周期 (天)'}</label>
                <span className="text-[11px] font-black text-blue-600">{config.days} 天</span>
              </div>
              <input type="range" min="7" max="30" value={config.days} onChange={(e) => handleChange('days', Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              <div className="flex justify-between text-[9px] text-gray-400 font-medium"><span>加急</span><span>常规</span></div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-gray-700">{viewMode === 'business' ? '供能覆盖规模' : '额定流量 (Q)'}</label>
                <span className="text-[11px] font-black text-blue-600">{viewMode === 'business' ? `约 ${householdCoverage} 户` : `${Math.round(config.material * 15)} Nm³/h`}</span>
              </div>
              <input type="range" min="20" max="100" value={config.material} onChange={(e) => handleChange('material', Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              <div className="flex justify-between text-[9px] text-gray-400 font-medium"><span>300户</span><span>1500户</span></div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-700 block">{viewMode === 'business' ? '稳态保障精度' : '稳压精度 (AC)'}</label>
              <select value={config.accuracy} onChange={(e) => handleChange('accuracy', Number(e.target.value))} className="w-full text-[11px] font-medium border border-gray-200 rounded-lg p-2 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                <option value={10}>{viewMode === 'business' ? '标准稳态 (±10%)' : 'AC10'}</option>
                <option value={5}>{viewMode === 'business' ? '极高稳态 (±5%)' : 'AC5'}</option>
                <option value={2.5}>{viewMode === 'business' ? '实验室级 (±2.5%)' : 'AC2.5'}</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-700 block">{viewMode === 'business' ? '管网适配压力' : '进口压力 (P1)'}</label>
              <select value={config.inletPressure} onChange={(e) => handleChange('inletPressure', e.target.value)} className="w-full text-[11px] font-medium border border-gray-200 rounded-lg p-2 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                <option value="0.2-0.4MPa">{viewMode === 'business' ? '城市中压 (0.2-0.4MPa)' : '中压A'}</option>
                <option value="0.01-0.2MPa">{viewMode === 'business' ? '城市低压 (0.01-0.2MPa)' : '中压B'}</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-700 block">{viewMode === 'business' ? '结构冗余形式' : '结构形式'}</label>
              <select value={config.structure} onChange={(e) => handleChange('structure', e.target.value)} className="w-full text-[11px] font-medium border border-gray-200 rounded-lg p-2 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                <option value="1+0">{viewMode === 'business' ? '单路标准 (1+0)' : '单路'}</option>
                <option value="1+1">{viewMode === 'business' ? '一开一备 (1+1)' : '双路'}</option>
                <option value="2+0">{viewMode === 'business' ? '双路并联 (2+0)' : '并联'}</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-700 block">{viewMode === 'business' ? '预期使用寿命' : '材质选择'}</label>
              <select value={config.materialType} onChange={(e) => handleChange('materialType', e.target.value)} className="w-full text-[11px] font-medium border border-gray-200 rounded-lg p-2 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                <option value="carbon">{viewMode === 'business' ? '标准防腐 (8-10年)' : '碳钢'}</option>
                <option value="stainless">{viewMode === 'business' ? '长效耐腐 (15-20年)' : '304不锈钢'}</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-700 block">{viewMode === 'business' ? '极端天气保障' : '防冻保温配置'}</label>
              <select value={config.insulation} onChange={(e) => handleChange('insulation', e.target.value)} className="w-full text-[11px] font-medium border border-gray-200 rounded-lg p-2 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                <option value="basic">{viewMode === 'business' ? '标准保温 (0℃以上)' : '标准保温棉'}</option>
                <option value="advanced">{viewMode === 'business' ? '智能防爆电伴热 (-20℃以下)' : '防爆电伴热系统'}</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-700 block">{viewMode === 'business' ? '数智运维能力' : '远传监控模块'}</label>
              <select value={config.telemetry} onChange={(e) => handleChange('telemetry', e.target.value)} className="w-full text-[11px] font-medium border border-gray-200 rounded-lg p-2 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                <option value="basic">{viewMode === 'business' ? '人工抄表 (基础)' : '基础表计'}</option>
                <option value="full">{viewMode === 'business' ? '5G全量数据远传' : 'NB-IoT/5G 模块'}</option>
              </select>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-gray-600" />
                <span className="text-[11px] font-bold text-gray-700">{viewMode === 'business' ? '环境静音能力' : '降噪模块 (dB)'}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={config.noiseReduction} onChange={(e) => handleChange('noiseReduction', e.target.checked)} />
                <div className="w-10 h-5.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="h-48 mb-4">
          <AnimatePresence mode="wait">
            {isCalculating && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center gap-2 text-blue-500">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[11px] font-bold tracking-tight">行业专家知识模型正在推演算账...</span>
              </motion.div>
            )}
            {showResult && !isCalculating && (
              <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col gap-3">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-2.5 text-[11px] text-blue-800 flex justify-between items-center shadow-sm">
                  <div className="flex items-center gap-2 font-bold"><CheckCircle size={14} /> 仿真能力已重构达标</div>
                  <div className="text-[10px] text-blue-600 font-bold cursor-pointer hover:underline" onClick={handleSaveConfig}>保存此组合</div>
                </div>
                
                <div className="flex-1 border border-gray-100 rounded-xl bg-white p-3 flex flex-col shadow-sm">
                  <div className="text-[10px] text-gray-400 mb-2 font-black uppercase tracking-widest">TCO 全生命周期成本对比</div>
                  <div className="flex-1 flex items-end gap-3 pt-2 h-24">
                    <div className="flex-1 flex flex-col items-center h-full justify-end gap-1">
                      <span className="text-[10px] text-blue-600 font-black">¥{(initialCost/10000).toFixed(1)}万</span>
                      <div className="w-full h-16 relative flex items-end">
                        <div className="w-full bg-blue-500 rounded-t-lg" style={{ height: `${initialCostHeight}%` }}></div>
                      </div>
                      <span className="text-[9px] text-gray-400 font-bold">初期投入</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center h-full justify-end gap-1">
                      <span className="text-[10px] text-blue-600 font-black">¥{(maintCost/10000).toFixed(1)}万</span>
                      <div className="w-full h-16 relative flex items-end">
                        <div className="w-full bg-blue-500 rounded-t-lg" style={{ height: `${maintenanceCostHeight}%` }}></div>
                      </div>
                      <span className="text-[9px] text-gray-400 font-bold">5年维保</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center h-full justify-end gap-1">
                      <span className="text-[10px] text-teal-600 font-black">¥{(timeCost/10000).toFixed(1)}万</span>
                      <div className="w-full h-16 relative flex items-end">
                        <div className="w-full bg-teal-500 rounded-t-lg" style={{ height: `${timeCostHeight}%` }}></div>
                      </div>
                      <span className="text-[9px] text-gray-400 font-bold">风险/损失</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ButtonSolid onClick={() => onNext(config)} disabled={isCalculating || !showResult} className="py-3.5 text-sm uppercase tracking-widest">确认仿真结果，生成需求说明书</ButtonSolid>
      </div>
    </Card>
  );
};

const ConsensusSection = () => {
  return (
    <div className="mt-6 border-t border-gray-100 pt-4">
      <div className="flex items-center gap-2 text-[11px] font-black text-blue-800 mb-3 uppercase tracking-widest">
        <UserCheck size={14} /> 需求共识决策链
      </div>
      <div className="space-y-2">
        <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
          <div className="text-[9px] font-bold text-blue-600 mb-2 uppercase tracking-tighter">强制共识人员 (集团规格要求)</div>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input type="checkbox" checked readOnly className="peer appearance-none w-4 h-4 rounded border border-blue-300 bg-white checked:bg-blue-600 checked:border-blue-600 transition-all" />
                <Check size={10} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <div className="flex-1">
                <div className="text-[11px] font-bold text-gray-800">张明远 <span className="text-[9px] font-normal text-gray-500 ml-1">直属上级 / 区域经理</span></div>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input type="checkbox" checked readOnly className="peer appearance-none w-4 h-4 rounded border border-blue-300 bg-white checked:bg-blue-600 checked:border-blue-600 transition-all" />
                <Check size={10} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <div className="flex-1">
                <div className="text-[11px] font-bold text-gray-800">李建国 <span className="text-[9px] font-normal text-gray-500 ml-1">技术专家 / 总工办</span></div>
              </div>
            </label>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
          <div className="text-[9px] font-bold text-gray-500 mb-2 uppercase tracking-tighter">可选共识人员</div>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input type="checkbox" className="peer appearance-none w-4 h-4 rounded border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 transition-all" />
                <Check size={10} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <div className="flex-1">
                <div className="text-[11px] font-bold text-gray-800">王志强 <span className="text-[9px] font-normal text-gray-500 ml-1">财务初审</span></div>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input type="checkbox" className="peer appearance-none w-4 h-4 rounded border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 transition-all" />
                <Check size={10} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <div className="flex-1">
                <div className="text-[11px] font-bold text-gray-800">赵敏 <span className="text-[9px] font-normal text-gray-500 ml-1">现场接收人</span></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const Step4Card = ({ config, onPreviewSOP, onConfirm }: { config: ConfigState, onPreviewSOP?: () => void, onConfirm: () => void }) => {
  const [showTCO, setShowTCO] = useState(false);
  const [viewMode, setViewMode] = useState<'business' | 'technical'>('business');
  const [isCapabilitiesOpen, setIsCapabilitiesOpen] = useState(false);
  const [isValueOpen, setIsValueOpen] = useState(false);

  return (
    <Card className="mt-2 border-blue-100 shadow-xl overflow-hidden">
      {showTCO && <TCOTrustPopup onClose={() => setShowTCO(false)} />}
      <div className="p-3 sm:p-4 border-b border-blue-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-blue-50/30">
        <div className="flex items-center gap-2 min-w-0 w-full sm:w-auto">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner shrink-0"><FileText size={18} /></div>
          <div className="min-w-0 flex-1">
            <span className="font-black text-gray-900 text-sm sm:text-base block leading-none truncate">需求说明书</span>
            <span className="text-[9px] sm:text-[10px] text-blue-600 font-bold uppercase tracking-tighter block truncate">Requirement Specification</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex bg-white/80 backdrop-blur-sm rounded-lg p-0.5 border border-blue-100 shrink-0">
            <button onClick={() => setViewMode('business')} className={`px-2 py-1 text-[9px] sm:text-[10px] font-bold rounded-md transition-all ${viewMode === 'business' ? 'bg-blue-600 shadow-sm text-white' : 'text-blue-600 hover:bg-blue-50'}`}>业务</button>
            <button onClick={() => setViewMode('technical')} className={`px-2 py-1 text-[9px] sm:text-[10px] font-bold rounded-md transition-all ${viewMode === 'technical' ? 'bg-blue-600 shadow-sm text-white' : 'text-blue-600 hover:bg-blue-50'}`}>技术</button>
          </div>
          <button onClick={onPreviewSOP} className="px-2 py-1 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg text-[9px] sm:text-[10px] font-bold flex items-center gap-1 hover:bg-blue-100 transition-all shrink-0">
            <ClipboardList size={10} /> SOP
          </button>
          <button className="px-2 py-1 bg-blue-600 text-white rounded-lg text-[9px] sm:text-[10px] font-bold flex items-center gap-1 hover:bg-blue-700 transition-all shadow-sm shrink-0">
            <Download size={10} /> 导出
          </button>
        </div>
      </div>
      
      <div className="p-3 sm:p-5 space-y-4 sm:space-y-6">
        <div className="bg-blue-50/50 p-4 sm:p-5 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10"><MessageSquare size={60} className="text-blue-600" /></div>
          <div className="flex items-center gap-2 text-[11px] font-black text-blue-600 mb-3 uppercase tracking-widest">
            <ShieldCheck size={14} /> 意图定稿确认
          </div>
          
          <div className="space-y-4 relative z-10">
            <p className="text-[13px] text-gray-700 leading-relaxed font-medium italic">
              “针对您在<span className="text-blue-600 font-bold">老旧小区</span>环境下对<span className="text-blue-600 font-bold">冬季供暖保障</span>的极高要求，我已锁定了具备<span className="text-blue-800 font-bold underline decoration-blue-500 underline-offset-4">‘极寒不结冰’</span>核心能力的物资，并同步输出了<span className="text-blue-800 font-bold underline decoration-blue-500 underline-offset-4">‘本地化供应优化建议’</span>以降低物流 TCO。”
            </p>

            <div className="flex flex-wrap gap-2 py-2">
              {['老旧小区改造', '冬季保供', '静音免维护', '极寒保障', '模块化安装'].map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] text-blue-600 font-bold">#{tag}</span>
              ))}
            </div>

            <div className="bg-white rounded-xl p-3 border border-blue-100">
              <div className="text-[10px] text-blue-600 font-bold mb-2 flex items-center gap-1">
                <AlertTriangle size={12} /> 已识别并规避的隐式风险 (3)
              </div>
              <ul className="space-y-1.5">
                <li className="text-[10px] text-gray-600 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                  <span><span className="text-gray-900 font-bold">防浪涌冲击设计：</span>规避管网压力突变导致的调压器切断失效。</span>
                </li>
                <li className="text-[10px] text-gray-600 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                  <span><span className="text-gray-900 font-bold">增强型防爆等级：</span>针对狭小空间通风不畅，自动升级为 Ex d IIB T4。</span>
                </li>
                <li className="text-[10px] text-gray-600 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                  <span><span className="text-gray-900 font-bold">抗共振结构：</span>针对老旧建筑共振风险，增加箱体阻尼支架。</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 border-t border-blue-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 border border-blue-500/20">
                <UserCheck size={20} />
              </div>
              <div>
                <div className="text-[11px] text-gray-900 font-bold">专家寄语</div>
                <div className="text-[10px] text-gray-500">“您的意图已转化为专业规格，该方案已通过 19 项行业标准校验，可发起需求共识。”</div>
              </div>
            </div>
          </div>
        </div>
        
        <Accordion title={viewMode === 'business' ? '核心能力定义 (业务获得感)' : '技术规格参数 (可信依据)'} defaultOpen={true}>
          {viewMode === 'business' ? (
            <div className="space-y-4 text-[11px]">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-gray-500 font-bold uppercase tracking-tighter">供能能力:</span>
                  <div className="text-right">
                    <div className="text-[14px] font-black text-gray-900">燃气调压能力</div>
                    <div className="text-[10px] text-blue-600 font-bold">保障 {Math.round(config.material * 15)} 户稳定供气</div>
                  </div>
                </div>
                <ReasoningBlock 
                  title="供能能力推演"
                  scenario="老旧小区改造，需覆盖约 1500 户居民峰值用气。"
                  knowledge="根据《城镇燃气设计规范》，调压箱规格需匹配户数峰值流量，并预留 20% 冗余。"
                  result="推荐规格：Q=900Nm³/h，满足 1500 户供暖+烹饪需求。"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-gray-500 font-bold uppercase tracking-tighter">稳态保障能力:</span>
                  <div className="text-right">
                    <div className="text-[14px] font-black text-blue-600">极高调压精度</div>
                    <div className="text-[10px] text-blue-400 font-bold">波动范围 ≤±10%</div>
                  </div>
                </div>
                <ReasoningBlock 
                  title="稳态保障推演"
                  scenario="终端用户对压力波动敏感。"
                  knowledge="采用双级稳压结构，可有效过滤中压管网压力波动。"
                  result="确保灶具燃烧稳定，无离焰或回火风险。"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <span className="text-gray-500">结构可靠性:</span>
                  <div className="text-right">
                    <div className="text-[13px] font-bold text-blue-600">{config.material > 50 ? '极强耐腐蚀' : '高强度结构'}</div>
                    <div className="text-[9px] text-gray-400">{config.material > 50 ? '适应极端潮湿环境' : '保障长期运行不形变'}</div>
                  </div>
                </div>
                <ReasoningBlock 
                  title="结构可靠性推演"
                  scenario={config.material > 50 ? "项目位于沿海/高湿度地带。" : "标准内陆环境。"}
                  knowledge="高湿度环境下，碳钢易发生电化学腐蚀，不锈钢 304 可提升 3 倍以上使用寿命。"
                  result={config.material > 50 ? "材质升级为 304 不锈钢，确保 15 年免维护。" : "采用 Q235B 碳钢+三层防腐涂装。"}
                />
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-500">环境静音能力:</span>
                <div className="text-right">
                  <div className="text-[13px] font-bold text-gray-900">{config.noiseReduction ? '极低噪音 (≤45dB)' : '标准静音 (≤55dB)'}</div>
                  <div className="text-[9px] text-gray-400">{config.noiseReduction ? '不干扰周边居民休息' : '符合近居民区标准'}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-gray-500">物资名称:</span><span className="text-gray-800 font-medium">燃气调压箱</span></div>
              <div className="flex justify-between"><span className="text-gray-500">需求数量:</span><span className="text-gray-800 font-medium">10 台</span></div>
              <div className="flex justify-between"><span className="text-gray-500">设计工作压力:</span><span className="text-gray-800 font-medium">2.0 kPa ±10% (1.8~2.2 kPa)</span></div>
              <div className="flex justify-between"><span className="text-gray-500">稳态调压精度:</span><span className="text-blue-600 font-medium bg-blue-50 px-1 rounded">≤±10%</span></div>
              <div className="flex justify-between"><span className="text-gray-500">管件材质:</span><span className="text-blue-600 font-medium">{config.material > 50 ? '304不锈钢' : '碳钢防腐'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">运行噪音限制:</span><span className="text-gray-800">{config.noiseReduction ? '≤45dB (增配消音器)' : '≤55dB (近居民区)'}</span></div>
            </div>
          )}
        </Accordion>

        <Accordion title="特种工况与配套要求" defaultOpen={false}>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-gray-500">防冻保温等级:</span><span className="text-blue-600 font-medium">{config.insulation === 'advanced' ? '智能防爆电伴热' : '标准保温棉'}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">远传监控:</span><span className="text-blue-600 font-medium">{config.telemetry === 'full' ? '5G全量数据远传' : '基础表计(人工抄表)'}</span></div>
            {config.noiseReduction && <div className="flex justify-between"><span className="text-gray-500">降噪模块:</span><span className="text-blue-600 font-medium">阻抗复合式消音器</span></div>}
            <div className="flex justify-between"><span className="text-gray-500">安全监测配套:</span><span className="text-gray-800">防爆可燃气体探测器、智能压力监测终端</span></div>
            <div className="flex justify-between"><span className="text-gray-500">特种服务:</span><span className="text-gray-800">狭小空间吊装指导</span></div>
          </div>
        </Accordion>

        <Accordion title="最优需求：质量、价格、交付" defaultOpen={true}>
          <div className="space-y-3 text-xs">
            <div className="bg-gray-50 p-2 rounded border border-gray-100">
              <div className="font-semibold text-gray-800 mb-1 flex items-center gap-1">
                <ShieldCheck size={12} className="text-blue-500"/> 质量最优保障
              </div>
              <div className="text-gray-600">外观漆膜厚度≥80μm；出厂提供-20℃低温环境模拟测试报告；具备防爆合格证及特种设备制造许可证；核心焊缝探伤报告。</div>
              <ReasoningBlock 
                title="质量判别标准推演"
                scenario="老旧小区改造，需确保 15 年以上生命周期。"
                knowledge="根据《城镇燃气设施运行、维护和抢修安全技术规程》，关键焊缝需 100% 探伤，漆膜厚度决定防腐年限。"
                result="设定强制性质量判别标准：漆膜≥80μm，焊缝探伤报告必选。"
              />
            </div>
            <div className="bg-gray-50 p-2 rounded border border-gray-100">
              <div className="font-semibold text-gray-800 mb-1 flex items-center gap-1"><Activity size={12} className="text-blue-500"/> 价格(TCO)最优策略</div>
              <div className="text-gray-600">采用一体化防冷凝加热型调压箱。虽初期投入成本增加 15%，但规避了冻裂风险，十年维保成本下降 30%，全生命周期总账节省 12%。</div>
            </div>
            <div className="bg-gray-50 p-2 rounded border border-gray-100">
              <div className="font-semibold text-gray-800 mb-1 flex items-center gap-1"><Truck size={12} className="text-blue-500"/> 交付最优路径</div>
              <div className="text-gray-600">承诺 <span className="font-bold text-blue-600">{config.days} 天</span> 内到货。针对老旧小区空间受限，采用模块化拆装设计，人工辅助小型卷扬机就位。</div>
            </div>
          </div>
        </Accordion>

        <Accordion title="可能的风险点和控制方案" defaultOpen={false}>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-start gap-2">
              <span className="text-gray-500 shrink-0">风险点:</span>
              <span className="text-gray-800 text-right">老旧小区空间受限，大型吊车无法进入</span>
            </div>
            <div className="flex justify-between items-start gap-2">
              <span className="text-gray-500 shrink-0">控制方案:</span>
              <span className="text-blue-600 font-medium text-right bg-blue-50 px-1 rounded">采用模块化拆装设计，人工辅助小型卷扬机就位</span>
            </div>
            <div className="flex justify-between items-start gap-2 mt-2">
              <span className="text-gray-500 shrink-0">风险点:</span>
              <span className="text-gray-800 text-right">冬季极寒导致调压器膜片冻裂失效</span>
            </div>
            <div className="flex justify-between items-start gap-2">
              <span className="text-gray-500 shrink-0">控制方案:</span>
              <span className="text-blue-600 font-medium text-right bg-blue-50 px-1 rounded">强制配置防爆电伴热及保温层，并接入智能远传终端实时监测温度</span>
            </div>
          </div>
        </Accordion>

        <Accordion title="需求质量判别方案" defaultOpen={false}>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-gray-500">外观检查:</span><span className="text-gray-800">漆膜厚度≥80μm，无划痕脱落，箱体无变形</span></div>
            <div className="flex justify-between"><span className="text-gray-500">性能测试:</span><span className="text-gray-800">出厂前需提供 -20℃ 低温环境模拟测试报告及气密性测试报告</span></div>
            <div className="flex justify-between"><span className="text-gray-500">资质核验:</span><span className="text-gray-800">防爆合格证、特种设备制造许可证、核心部件材质单</span></div>
          </div>
        </Accordion>

        <Accordion title="可选替代方案" defaultOpen={false}>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-gray-500">方案A (经济型):</span><span className="text-gray-800">常规调压箱 + 外部加装简易保温棚 (成本-10%，维保频次高)</span></div>
            <div className="flex justify-between"><span className="text-gray-500">方案B (推荐):</span><span className="text-blue-600 font-medium">一体化防冷凝加热型调压箱 (TCO最优)</span></div>
          </div>
        </Accordion>

        <div className="mt-6 space-y-4">
          <div className="border border-blue-100 rounded-xl overflow-hidden shadow-sm">
            <button 
              onClick={() => setIsCapabilitiesOpen(!isCapabilitiesOpen)}
              className="w-full p-3 flex justify-between items-center bg-blue-50/50 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-2 text-[11px] font-bold text-blue-800">
                <Target size={14} /> 需能力清单 (附件)
              </div>
              {isCapabilitiesOpen ? <ChevronUp size={14} className="text-blue-400" /> : <ChevronDown size={14} className="text-blue-400" />}
            </button>
            <AnimatePresence>
              {isCapabilitiesOpen && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white">
                  <div className="p-3 space-y-3">
                    <div className="flex items-start gap-3 p-2 border border-blue-50 rounded-xl bg-blue-50/20">
                      <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><Truck size={12} /></div>
                      <div>
                        <div className="text-[11px] font-bold text-gray-800">全量物资敏捷履约能力</div>
                        <div className="text-[10px] text-gray-600 leading-relaxed">具备多品类物资协同排产与到货能力，支持老旧小区复杂环境下的分批次精准交付。</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 border border-orange-50 rounded-xl bg-orange-50/20">
                      <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0"><Zap size={12} /></div>
                      <div>
                        <div className="text-[11px] font-bold text-gray-800">复杂工况适配能力</div>
                        <div className="text-[10px] text-gray-600 leading-relaxed">具备针对极寒、地下、高噪音环境的定制化生产能力，确保全量物资在特殊环境下性能不衰减。</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 border border-blue-50 rounded-xl bg-blue-50/20">
                      <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><ShieldCheck size={12} /></div>
                      <div>
                        <div className="text-[11px] font-bold text-gray-800">系统级安全保障能力</div>
                        <div className="text-[10px] text-gray-600 leading-relaxed">通过全量BOM的逻辑校验，规避压力等级不匹配等系统性风险，保障20年运行安全。</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border border-blue-100 rounded-xl overflow-hidden shadow-sm">
            <button 
              onClick={() => setIsValueOpen(!isValueOpen)}
              className="w-full p-3 flex justify-between items-center bg-blue-50/50 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-2 text-[11px] font-bold text-blue-800">
                <ShieldCheck size={14} /> 客户价值表 (附件)
              </div>
              {isValueOpen ? <ChevronUp size={14} className="text-blue-400" /> : <ChevronDown size={14} className="text-blue-400" />}
            </button>
            <AnimatePresence>
              {isValueOpen && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white">
                  <div className="p-3">
                    <table className="w-full text-[10px] border-collapse">
                      <thead>
                        <tr className="bg-blue-50 text-blue-800">
                          <th className="border border-blue-100 p-2 text-left">价值维度</th>
                          <th className="border border-blue-100 p-2 text-left">客户价值</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-blue-100 p-2 font-bold text-gray-800">安全与稳定</td>
                          <td className="border border-blue-100 p-2 text-gray-600">全系统机理兼容，确保老旧小区改造后 20 年运行无重大安全隐患。</td>
                        </tr>
                        <tr>
                          <td className="border border-blue-100 p-2 font-bold text-gray-800">经济与运维</td>
                          <td className="border border-blue-100 p-2 text-gray-600">智能远传减少 90% 人工抄表成本，预防性维护降低 40% 突发故障率。</td>
                        </tr>
                        <tr>
                          <td className="border border-blue-100 p-2 font-bold text-gray-800">社会与品牌</td>
                          <td className="border border-blue-100 p-2 text-gray-600">极速响应与静音设计，打造“民生工程”标杆，提升企业社会信誉。</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <ConsensusSection />

        <ButtonSolid onClick={onConfirm} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 shadow-lg py-3 text-[13px] font-black tracking-widest uppercase">
          需求共识
        </ButtonSolid>
      </div>
    </Card>
  );
};

const GlobalScenarioCard = ({ onConfirm }: { onConfirm: (s: ScenarioState) => void }) => {
  const [scenarios, setScenarios] = useState<ScenarioState>({
    noise: true,
    underground: false,
    power: false,
    cold: false
  });

  const toggle = (key: keyof ScenarioState) => setScenarios(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <Card className="mt-2 border-blue-100 shadow-lg overflow-hidden">
      <div className="p-4 bg-blue-900 text-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
            <Search size={14} className="text-blue-100" />
          </div>
          <span className="font-bold text-sm tracking-tight">场景定义：全局环境约束提取</span>
        </div>
        <p className="text-[12px] leading-relaxed font-medium text-blue-50">
          “我已从项目背景中提取出全局环境约束。这些约束将作为<span className="text-white font-bold underline decoration-blue-300/50 underline-offset-4 mx-0.5">推演基准</span>，批量映射至BOM清单中的每一项物资。”
        </p>
      </div>

      <div className="p-4 bg-white">
        <div className="space-y-3">
          <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 flex gap-3 items-start">
            <div className="p-1.5 bg-white rounded-full text-blue-500 shadow-sm"><Search size={14} /></div>
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-blue-800">智能识别结果</div>
              <p className="text-[10px] text-blue-700 leading-relaxed">
                已从“老旧小区改造”项目库自动提取全局环境约束。请核对，我将据此<strong>批量推演</strong>所有关键物资参数：
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <label className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${scenarios.noise ? 'border-blue-200 bg-blue-50/50' : 'border-gray-100 bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${scenarios.noise ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                  {scenarios.noise && <Check size={10} className="text-white" />}
                </div>
                <input type="checkbox" className="hidden" checked={scenarios.noise} onChange={() => toggle('noise')} />
                <div>
                  <div className="text-[11px] font-bold text-gray-800">靠近居民区 / 敏感设施</div>
                  <div className="text-[9px] text-gray-500">影响：设备噪音限制、危化品防漏等级</div>
                </div>
              </div>
            </label>
            <label className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${scenarios.underground ? 'border-blue-200 bg-blue-50/50' : 'border-gray-100 bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${scenarios.underground ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                  {scenarios.underground && <Check size={10} className="text-white" />}
                </div>
                <input type="checkbox" className="hidden" checked={scenarios.underground} onChange={() => toggle('underground')} />
                <div>
                  <div className="text-[11px] font-bold text-gray-800">地下阀井 / 易积水环境</div>
                  <div className="text-[9px] text-gray-500">影响：设备防护等级(IP)、信号穿透能力</div>
                </div>
              </div>
            </label>
            <label className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${scenarios.power ? 'border-blue-200 bg-blue-50/50' : 'border-gray-100 bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${scenarios.power ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                  {scenarios.power && <Check size={10} className="text-white" />}
                </div>
                <input type="checkbox" className="hidden" checked={scenarios.power} onChange={() => toggle('power')} />
                <div>
                  <div className="text-[11px] font-bold text-gray-800">无市电接入条件</div>
                  <div className="text-[9px] text-gray-500">影响：供电方式、通讯模块功耗</div>
                </div>
              </div>
            </label>
            <label className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${scenarios.cold ? 'border-blue-200 bg-blue-50/50' : 'border-gray-100 bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${scenarios.cold ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                  {scenarios.cold && <Check size={10} className="text-white" />}
                </div>
                <input type="checkbox" className="hidden" checked={scenarios.cold} onChange={() => toggle('cold')} />
                <div>
                  <div className="text-[11px] font-bold text-gray-800">极寒气候 / 冰冻灾害频发</div>
                  <div className="text-[9px] text-gray-500">影响：防冻裂设计、电伴热配置</div>
                </div>
              </div>
            </label>
          </div>
          <ButtonSolid onClick={() => onConfirm(scenarios)} className="w-full bg-blue-600 hover:bg-blue-700 py-3 mt-4 text-[12px] font-bold shadow-lg shadow-blue-100 uppercase tracking-widest">确认环境约束，进行需求增强</ButtonSolid>
        </div>
      </div>
    </Card>
  );
};

const ReviewItemCard = ({
  title,
  badge,
  coreParams,
  scenarios,
  reasoning,
  details,
  onAdjust,
  isAdjusted
}: {
  title: string,
  badge: string,
  coreParams: string[],
  scenarios: ScenarioState,
  reasoning: React.ReactNode,
  details: React.ReactNode,
  onAdjust: () => void,
  isAdjusted?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReasoningOpen, setIsReasoningOpen] = useState(false);

  return (
    <div className={`border ${isAdjusted ? 'border-blue-200 bg-blue-50/20' : 'border-gray-100 bg-white'} rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md`}>
      <div className={`p-3 cursor-pointer ${isAdjusted ? 'hover:bg-blue-50/40' : 'hover:bg-gray-50'} transition-colors`} onClick={() => setIsOpen(!isOpen)}>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-gray-800 flex items-center gap-1.5">
              {isAdjusted ? <CheckCircle size={12} className="text-blue-600" /> : <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
              {title}
              {isAdjusted && <span className="text-[9px] text-blue-600 font-bold ml-1 bg-blue-100 px-1 rounded">已优化</span>}
            </span>
            <span className="text-[9px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-medium border border-blue-100">{badge}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={(e) => { e.stopPropagation(); onAdjust(); }} className="text-[9px] text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-md transition-all font-bold border border-blue-100">
              <Sliders size={9} /> 调整参数
            </button>
            {isOpen ? <ChevronUp size={12} className="text-gray-400" /> : <ChevronDown size={12} className="text-gray-400" />}
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {coreParams.map((p, i) => <span key={i} className={`text-[8px] px-1 py-0.5 rounded border shadow-sm ${isAdjusted && p === '无保温' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-white text-gray-600 border-gray-100'}`}>{p}</span>)}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-gray-50">
            <div className="p-1.5 space-y-1.5 bg-gray-50">
              <div>
                <div className="text-[9px] font-semibold text-gray-700 mb-0.5 flex items-center gap-1"><ClipboardList size={9} /> 详细规格参数</div>
                <div className="bg-white p-1 rounded border border-gray-100 text-[8px] text-gray-600 space-y-0.5 shadow-sm">
                  {details}
                </div>
              </div>
              {reasoning && (
                <div>
                  <div 
                    className="text-[9px] font-semibold text-blue-700 mb-0.5 flex items-center gap-1 cursor-pointer hover:text-blue-800 transition-colors"
                    onClick={() => setIsReasoningOpen(!isReasoningOpen)}
                  >
                    <Lightbulb size={9} /> 业务推演逻辑
                    {isReasoningOpen ? <ChevronUp size={9} className="ml-0.5" /> : <ChevronDown size={9} className="ml-0.5" />}
                  </div>
                  <AnimatePresence>
                    {isReasoningOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="space-y-0.5 pt-0.5">
                          {reasoning}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const UnifiedReviewDashboard = ({ scenarios, onConfirm, isAuto }: { scenarios: ScenarioState, onConfirm: () => void, isAuto?: boolean }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState<'business' | 'technical'>('business');
  
  const items = [
    { 
      name: '中低压调压箱', 
      qty: 2, 
      businessSpecs: ['核心供能能力: 满足 1500 户居民高峰期供暖与烹饪需求', '静音运行: 满足老旧小区近距离安装不扰民要求', '物流优化: 建议优先考察项目所在地 200km 内供应商，降低重货运输成本'],
      technicalSpecs: ['额定流量: 1000Nm³/h', '噪音等级: ≤ 55dB(A) @ 1m', '自重: 约 1.2 吨 (建议本地化配送)'],
      supplement: '已自动补全：针对老旧小区空间狭窄，建议采用紧凑型立式结构，占地面积减少 30%。',
      evaluation: '建议增加：进出口压力远传模块，实现无人值守实时监控。'
    },
    { 
      name: '智能燃气表', 
      qty: 1500, 
      businessSpecs: ['精准计量: 满足阶梯气价精准计费需求', '远程充值: 支持手机 APP 实时缴费与余额提醒', '安全预警: 具备异常流量自动切断功能'],
      technicalSpecs: ['计量等级: 1.5 级', '通信方式: NB-IoT / LoRaWAN 可选', '切断阈值: 1.2 倍额定流量'],
      supplement: '已自动补全：考虑到用户多为高龄群体，建议配置大尺寸背光液晶屏。',
      evaluation: '建议增加：内置超声波计量模块，提升小流量触发灵敏度。'
    }
  ];

  const globalSections = [
    { title: '关键物资深度定义', items: items.map(it => it.name), defaultOpen: true, icon: <Box size={10} /> },
    { title: '标准品清单 (自动匹配)', items: ['无缝钢管 (L=2.4km)', 'PE管 (L=1.2km)', '标准法兰 (x86)', '紧固件 (x240)', '密封垫片 (x120)'], defaultOpen: false, icon: <Layers size={10} /> },
    { title: '特殊工况应对方案', items: ['自动恒温加热系统 (针对极寒)', '高效隔音消声模块 (针对居民区)'], defaultOpen: false, icon: <Wind size={10} /> },
    { title: '初步 TCO 成本预估', items: ['预计 3 年总运维成本降低 30%', '物流成本优化建议 (本地化比例 > 60%)'], defaultOpen: false, icon: <TrendingUp size={10} /> },
    { title: '需求质量判别方案', items: ['关键参数一致性检查 (AI 自动核验)', '场景匹配度 98% (基于历史数据)'], defaultOpen: false, icon: <ShieldCheck size={10} /> }
  ];

  return (
    <Card className="mt-2 border-blue-100 shadow-lg overflow-hidden">
      <div className="p-4 bg-blue-600 text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <GitMerge size={14} className="text-blue-100" />
            </div>
            <span className="font-bold text-sm tracking-tight">行业专家知识模型：需求增强</span>
          </div>
          <div className="flex bg-white/10 p-0.5 rounded-lg border border-white/20 backdrop-blur-sm">
            <button 
              onClick={() => setViewMode('business')}
              className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${viewMode === 'business' ? 'bg-blue-500 text-white shadow-lg' : 'text-blue-200 hover:text-white'}`}
            >
              业务视角
            </button>
            <button 
              onClick={() => setViewMode('technical')}
              className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${viewMode === 'technical' ? 'bg-blue-500 text-white shadow-lg' : 'text-blue-200 hover:text-white'}`}
            >
              技术规格
            </button>
          </div>
        </div>
        <div className="bg-blue-500/20 border border-blue-400/30 p-3 rounded-xl">
          <div className="text-[10px] font-bold text-blue-200 mb-1 uppercase tracking-widest">专家知识增强结论</div>
          <p className="text-xs leading-relaxed text-blue-50">
            “基于您的项目背景，我已通过行业专家模型为您注入了<span className="text-blue-300 font-bold"> 6 项核心能力 </span>。您的意图已被精准理解：重点解决老旧小区<span className="text-white font-bold">‘空间受限’</span>与<span className="text-white font-bold">‘极寒供暖保障’</span>之间的矛盾。”
          </p>
        </div>
      </div>
      
      <div className="p-2 space-y-2">
        {globalSections.map((section, sIdx) => (
          <Accordion 
            key={sIdx} 
            title={section.title} 
            defaultOpen={section.defaultOpen}
          >
            <div className="p-2 bg-gray-50/50 space-y-2">
              {section.title === '关键物资深度定义' ? (
                <div className="space-y-2">
                  <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                    {items.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`flex-1 py-1.5 text-[10px] font-bold rounded-md transition-all ${activeTab === idx ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                  
                  <div className="bg-white rounded-lg p-2 border border-gray-100 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-bold text-[11px]">{items[activeTab].name}</span>
                      <span className="text-gray-500 text-[9px] font-bold bg-gray-100 px-2 py-0.5 rounded-full">数量: {items[activeTab].qty}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider flex justify-between items-center">
                        <span>{viewMode === 'business' ? '业务能力需求' : '核心能力规格'}</span>
                        <span className="text-[7px] font-black text-blue-500 flex items-center gap-0.5 bg-blue-50 px-1 rounded border border-blue-100">
                          <TrendingUp size={6} /> 历史数据决策参考已开启
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {(viewMode === 'business' ? items[activeTab].businessSpecs : items[activeTab].technicalSpecs).map((spec, i) => (
                          <div key={i} className="relative group">
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-[10px] border border-blue-100 block">
                              {spec}
                            </span>
                            <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-[6px] px-1 rounded-full font-black shadow-sm border border-white scale-75 origin-bottom-left">
                              {85 + (i * 3) % 15}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 mt-2">
                      <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-2">
                        <div className="text-[9px] font-bold text-blue-700 mb-1 flex items-center gap-1"><Lightbulb size={10} /> 业务逻辑补全</div>
                        <div className="text-[10px] text-blue-900 leading-relaxed">{items[activeTab].supplement}</div>
                      </div>
                      <div className="bg-orange-50/50 border border-orange-100 rounded-lg p-2">
                        <div className="text-[9px] font-bold text-orange-700 mb-1 flex items-center gap-1"><ShieldCheck size={10} /> 智能评估建议</div>
                        <div className="text-[10px] text-orange-900 leading-relaxed">{items[activeTab].evaluation}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-1">
                  {section.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-100 text-[10px] text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Accordion>
        ))}

        {!isAuto && (
          <ButtonSolid 
            className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 shadow-lg text-[12px] font-black tracking-widest uppercase" 
            onClick={onConfirm}
          >
            确认需求增强，进入需求仿真
          </ButtonSolid>
        )}
      </div>
    </Card>
  );
};

const MaterialConfirmationCard = ({ material, onConfirm }: { material: string, onConfirm: () => void }) => (
  <Card className="mt-2 border-green-100 shadow-xl overflow-hidden bg-white">
    <div className="p-4">
      <div className="flex items-center gap-2 text-[11px] font-black text-green-700 mb-4 uppercase tracking-widest">
        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><CheckCircle size={14} /></div>
        物资品类确认
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="col-span-2 bg-green-50/50 rounded-2xl p-4 border border-green-100/50">
          <div className="text-[10px] text-green-600 font-bold mb-1 uppercase tracking-tighter">拟采购物资名称</div>
          <div className="text-xl font-black text-gray-900">{material}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-white border border-green-200 text-green-700 rounded-lg text-[10px] font-bold shadow-sm">标准件</span>
            <span className="px-2 py-1 bg-white border border-green-200 text-green-700 rounded-lg text-[10px] font-bold shadow-sm">高频采购</span>
            <span className="px-2 py-1 bg-white border border-green-200 text-green-700 rounded-lg text-[10px] font-bold shadow-sm">关键设备</span>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
          <div className="text-[9px] text-gray-400 font-bold mb-1 uppercase">逻辑匹配度</div>
          <div className="text-lg font-black text-blue-600">98.5%</div>
        </div>
        <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
          <div className="text-[9px] text-gray-400 font-bold mb-1 uppercase">推荐等级</div>
          <div className="text-lg font-black text-orange-500">A+</div>
        </div>
      </div>

      <div className="bg-blue-50/30 rounded-2xl p-3 border border-blue-100/50 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Zap size={12} className="text-blue-600" />
          <span className="text-[10px] font-black text-blue-800 uppercase">下一步：专家模型增强推演</span>
        </div>
        <p className="text-[9px] text-blue-700/70 leading-relaxed font-medium">系统将调取该物资的行业知识库，结合您的业务场景进行深度参数补全与风险规避。</p>
      </div>

      <ButtonSolid onClick={onConfirm} className="w-full bg-green-600 hover:bg-green-700 text-[12px] py-3 rounded-2xl shadow-lg shadow-green-100">
        确认物资，启动增强推演
      </ButtonSolid>
    </div>
  </Card>
);

const SOPDetailView = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState(0);
  const steps = [
    { 
      title: '外观铭牌核对', 
      desc: '核对铭牌参数（压力、流量、防爆等级）是否与需求说明书一致。检查漆膜是否有划伤。', 
      icon: <Search size={14} />,
      video: 'https://picsum.photos/seed/inspect/400/225',
      checkpoints: ['铭牌字迹清晰', '无运输磕碰', '防爆标志符合']
    },
    { 
      title: '关键尺寸测量', 
      desc: '使用数显卡尺测量法兰中心距、通径。偏差需控制在 ±1mm 以内。', 
      icon: <Sliders size={14} />,
      video: 'https://picsum.photos/seed/measure/400/225',
      checkpoints: ['法兰中心距', '进出口通径', '箱体壁厚']
    },
    { 
      title: '密封性测试', 
      desc: '接入 0.6MPa 气源，使用肥皂水涂抹连接处，观察 1 分钟内是否有气泡。', 
      icon: <Activity size={14} />,
      video: 'https://picsum.photos/seed/test/400/225',
      checkpoints: ['连接处无气泡', '压力表无掉压', '切断阀动作灵敏']
    },
    { 
      title: '智能模块联调', 
      desc: '通电确认 NB-IoT 信号强度 > -90dBm，数据上传成功至云端。', 
      icon: <Cpu size={14} />,
      video: 'https://picsum.photos/seed/iot/400/225',
      checkpoints: ['信号强度达标', '数据上传正常', '低电量报警测试']
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div 
        className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        layoutId="sop-modal"
      >
        <header className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <ClipboardList size={20} />
            </div>
            <div>
              <h2 className="font-black text-gray-900 text-sm">物资验收质量指引 (SOP)</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Quality Inspection Guide</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-all">
            <X size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-12 gap-3 mb-4">
            <div className="col-span-12 bg-blue-600 rounded-2xl p-4 text-white relative overflow-hidden shadow-lg shadow-blue-100">
              <div className="absolute -right-4 -bottom-4 opacity-10"><ShieldCheck size={100} /></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-[9px] font-bold backdrop-blur-sm">核心原则</span>
                </div>
                <h3 className="text-lg font-black mb-1">“看、量、试、调”四步法</h3>
                <p className="text-xs text-blue-100 leading-relaxed font-medium">依托专家级验收逻辑，确保每一项物资都符合《需求说明书》的极致标准，规避 99% 的现场安装风险。</p>
              </div>
            </div>

            {/* Navigation Tabs (Lego style) */}
            <div className="col-span-12 flex gap-2 overflow-x-auto no-scrollbar py-1">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-[11px] font-black transition-all border-2 ${activeTab === idx ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-gray-100 text-gray-400 hover:border-blue-200'}`}
                >
                  {idx + 1}. {step.title}
                </button>
              ))}
            </div>

            {/* Active Content (Mosaic/Puzzle style) */}
            <div className="col-span-12 grid grid-cols-12 gap-3">
              <motion.div 
                key={`video-${activeTab}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-12 sm:col-span-7 aspect-video bg-gray-100 rounded-3xl overflow-hidden relative group border-4 border-white shadow-xl"
              >
                <img src={steps[activeTab].video} alt="SOP Video" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-blue-600 shadow-2xl cursor-pointer"
                  >
                    <Play size={24} fill="currentColor" className="ml-1" />
                  </motion.div>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/20 backdrop-blur-xl rounded-full text-[10px] text-white font-black border border-white/30 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  现场实拍演示
                </div>
              </motion.div>

              <motion.div 
                key={`desc-${activeTab}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-12 sm:col-span-5 bg-white border border-gray-100 rounded-3xl p-5 flex flex-col shadow-xl shadow-gray-100/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">{steps[activeTab].icon}</div>
                    <div>
                      <span className="text-[10px] text-blue-600 font-black uppercase tracking-widest block leading-none mb-1">Step {activeTab + 1}</span>
                      <span className="text-sm font-black text-gray-900">{steps[activeTab].title}要点</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed font-bold mb-6">{steps[activeTab].desc}</p>
                  
                  <div className="space-y-3">
                    <div className="text-[9px] text-gray-400 font-black uppercase tracking-widest flex items-center gap-2">
                      <div className="h-px flex-1 bg-gray-100" />
                      核验清单 (Checklist)
                      <div className="h-px flex-1 bg-gray-100" />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {steps[activeTab].checkpoints.map((cp, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-100/50 group hover:bg-blue-50 hover:border-blue-100 transition-all cursor-default"
                        >
                          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-green-500 shadow-sm group-hover:text-blue-600"><CheckCircle size={12} /></div>
                          <span className="text-[10px] text-gray-700 font-black group-hover:text-blue-900">{cp}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Extra Lego Blocks */}
              <div className="col-span-12 sm:col-span-4 bg-indigo-600 rounded-3xl p-5 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
                <div className="absolute -right-6 -bottom-6 opacity-10 rotate-12"><Camera size={120} /></div>
                <div className="relative z-10">
                  <div className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">现场实拍指引</div>
                  <h4 className="text-sm font-black mb-2">拍摄铭牌与关键焊缝</h4>
                  <p className="text-[10px] text-indigo-100 leading-relaxed font-medium">请确保光线充足，微距拍摄铭牌参数及进出口法兰密封面，系统将自动进行视觉比对。</p>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-8 bg-white border-2 border-dashed border-gray-200 rounded-3xl p-5 flex items-center gap-5 group hover:border-blue-300 transition-all">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-blue-50 group-hover:text-blue-400 transition-all">
                  <Plus size={32} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-400 group-hover:text-blue-600 transition-all">添加自定义核验项</h4>
                  <p className="text-[10px] text-gray-400 font-medium">根据您的特殊工况，补充额外的验收标准</p>
                </div>
              </div>
            </div>

            <div className="col-span-12 bg-orange-50 border border-orange-100 rounded-2xl p-3 flex items-start gap-3">
              <div className="p-2 bg-white rounded-xl text-orange-500 shadow-sm"><AlertTriangle size={16} /></div>
              <div>
                <div className="text-[10px] font-black text-orange-800 mb-0.5">异常处理建议</div>
                <p className="text-[9px] text-orange-700/80 leading-relaxed">如发现铭牌模糊、尺寸超差或密封失效，请立即通过“需智”APP发起【质量异议】，系统将自动锁定尾款支付并通知供应商处理。</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 bg-white border border-gray-200 rounded-2xl text-xs font-black text-gray-600 hover:bg-gray-100 transition-all">
            我已了解
          </button>
          <button className="flex-1 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
            <Download size={14} /> 下载离线版
          </button>
        </footer>
      </motion.div>
    </motion.div>
  );
};

const BOMStep3Card = ({ onNext }: { onNext: (config: ConfigState) => void }) => {
  const [isCalculating, setIsCalculating] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [activeSimulation, setActiveSimulation] = useState<string | null>('燃气调压箱');
  const [viewMode, setViewMode] = useState<'business' | 'technical'>('business');
  const [vizMode, setVizMode] = useState<'3d' | 'image' | 'curve'>('3d');
  const [config, setConfig] = useState<ConfigState>({
    days: 15,
    material: 40,
    accuracy: 10,
    inletPressure: '0.2-0.4MPa',
    structure: '1+1',
    materialType: 'carbon',
    insulation: 'advanced',
    telemetry: 'full',
    noiseReduction: true
  });
  const [savedConfigs, setSavedConfigs] = useState<(ConfigState & {id: string, name: string})[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCalculating(false);
      setShowResult(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleConfigChange = (key: keyof ConfigState, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setIsCalculating(true);
    setShowResult(false);
    setTimeout(() => {
      setIsCalculating(false);
      setShowResult(true);
    }, 800);
  };

  const handleSave = () => {
    const name = `配置_${new Date().toLocaleTimeString()}`;
    setSavedConfigs([...savedConfigs, { ...config, id: Date.now().toString(), name }]);
  };

  const simulationMappings = {
    material: {
      label: '材质可靠性',
      impact: (val: number) => val > 50 ? '适应极端潮湿环境，确保 15 年免维护' : '标准防腐，满足常规内陆环境需求'
    },
    noiseReduction: {
      label: '环境静音能力',
      impact: (val: boolean) => val ? '降噪至 45dB 以下，不干扰周边居民休息' : '符合近居民区标准 (≤55dB)'
    },
    flow: {
      label: '核心供气能力',
      impact: (val: number) => `保障约 ${Math.round(val * 15)} 户居民的高峰期供暖与烹饪需求`
    }
  };

  const initialCost = 28000 + (config.material > 50 ? 5000 : 0) + (config.insulation === 'advanced' ? 3500 : 0) + (config.telemetry === 'full' ? 4200 : 0);
  const maintCost = (1500 + (config.material > 50 ? 0 : 1800) + (config.insulation === 'advanced' ? 0 : 2500) + (config.telemetry === 'full' ? 0 : 1200)) * 5;
  const timeCost = (30 - config.days) * 600 + (config.noiseReduction ? 0 : 5000);

  const maxCost = 45000;
  const initialCostHeight = Math.max(10, (initialCost / maxCost) * 100);
  const maintenanceCostHeight = Math.max(10, (maintCost / maxCost) * 100);
  const timeCostHeight = Math.max(10, (timeCost / maxCost) * 100);

  return (
    <Card className="mt-2 border-blue-100 shadow-lg overflow-hidden">
      <div className="p-3 border-b border-blue-50 flex flex-wrap justify-between items-center gap-2 bg-blue-50/30">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"><Box size={14} /></div>
          <span className="font-bold text-gray-800 text-sm">需求仿真：业务场景与能力共识 (BOM全量)</span>
        </div>
        <div className="flex bg-white/80 backdrop-blur-sm rounded-lg p-0.5 border border-blue-100">
          <button onClick={() => setViewMode('business')} className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${viewMode === 'business' ? 'bg-blue-600 shadow-sm text-white' : 'text-blue-600 hover:bg-blue-50'}`}>业务视图</button>
          <button onClick={() => setViewMode('technical')} className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${viewMode === 'technical' ? 'bg-blue-600 shadow-sm text-white' : 'text-blue-600 hover:bg-blue-50'}`}>技术视图</button>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-2 mb-4">
          <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">核心物资仿真 (可选)</div>
          <div className="grid grid-cols-3 gap-2">
            {['燃气调压箱', '智能流量计', '加臭机'].map(item => (
              <div 
                key={item} 
                onClick={() => setActiveSimulation(activeSimulation === item ? null : item)}
                className={`py-2 rounded-xl border text-[11px] font-bold text-center cursor-pointer transition-all ${activeSimulation === item ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-blue-300'}`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeSimulation && (
            <motion.div key={activeSimulation} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-4">
              <div className="w-full h-48 bg-blue-50 rounded-2xl relative flex items-center justify-center border border-blue-100 overflow-hidden shadow-inner">
                <div className="absolute inset-0 z-10">
                  {vizMode === '3d' && (
                    <Canvas camera={{ position: [3, 2, 4], fov: 45 }}>
                      <ambientLight intensity={0.7} />
                      <pointLight position={[10, 10, 10]} intensity={1.5} />
                      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                      <Suspense fallback={null}>
                        <Environment preset="city" />
                        <BOMModel type={activeSimulation} config={config} />
                        <ContactShadows position={[0, -1, 0]} opacity={0.6} scale={10} blur={2.5} far={4} />
                      </Suspense>
                      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                    </Canvas>
                  )}
                  {vizMode === 'image' && (
                    <div className="w-full h-full flex items-center justify-center bg-white">
                      <img 
                        src={`https://picsum.photos/seed/${activeSimulation}/800/600`} 
                        alt="实物图" 
                        className="max-w-full max-h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  {vizMode === 'curve' && (
                    <div className="w-full h-full p-4 bg-white">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { time: '0', val: 100 },
                          { time: '1', val: 120 },
                          { time: '2', val: 110 },
                          { time: '3', val: 130 },
                          { time: '4', val: 125 },
                          { time: '5', val: 140 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="time" hide />
                          <YAxis hide />
                          <Tooltip contentStyle={{ fontSize: '10px' }} />
                          <Line type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={2} dot={false} name="性能指标" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
                <div className="absolute top-2 right-2 z-20 flex flex-col gap-1">
                  <div className="bg-blue-900/50 text-white text-[10px] px-2 py-1 rounded-lg backdrop-blur-md border border-white/10 font-bold">
                    {activeSimulation} 实时机理仿真
                  </div>
                  <div className="flex bg-white/90 backdrop-blur-sm rounded-md p-0.5 border border-blue-100 shadow-sm">
                    <button onClick={() => setVizMode('3d')} className={`p-1 rounded transition-all ${vizMode === '3d' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'}`} title="3D视图"><Activity size={10} /></button>
                    <button onClick={() => setVizMode('image')} className={`p-1 rounded transition-all ${vizMode === 'image' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'}`} title="实物图"><ImageIcon size={10} /></button>
                    <button onClick={() => setVizMode('curve')} className={`p-1 rounded transition-all ${vizMode === 'curve' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'}`} title="仿真曲线"><LineChartIcon size={10} /></button>
                  </div>
                </div>
              </div>

              {/* 调整影响评估 (实时) */}
              <div className="mt-3 bg-blue-50/50 p-3 rounded-2xl border border-blue-100 shadow-sm">
                <div className="text-[11px] font-bold text-blue-800 mb-2 flex items-center gap-1.5">
                  <Zap size={12} className="text-blue-500" /> 调整影响评估 (实时)
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-[10px] text-gray-500 font-medium">供气保障能力</div>
                    <div className="text-xs font-bold text-gray-900 leading-tight">{simulationMappings.flow.impact(config.material > 50 ? 900 : 600)}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-gray-500 font-medium">环境友好度</div>
                    <div className="text-xs font-bold text-gray-900 leading-tight">{simulationMappings.noiseReduction.impact(config.noiseReduction)}</div>
                  </div>
                </div>
              </div>

              {/* 参数调节面板 */}
              <div className="mt-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4 shadow-sm">
                <div className="flex justify-between items-center border-b border-gray-200/50 pb-2">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                    <Sliders size={14} className="text-blue-500" /> 参数个性化调节
                  </div>
                  <button onClick={handleSave} className="text-[10px] text-blue-600 font-bold flex items-center gap-1 hover:underline">
                    <Bookmark size={10} /> 保存当前配置
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] text-gray-500 font-bold">{viewMode === 'business' ? '供气保障能力 / 户数' : '额定流量 (Q)'}</label>
                      <span className="text-[11px] font-black text-blue-600">
                        {viewMode === 'business' ? `约 ${Math.round(config.material * 15)} 户` : `${Math.round(config.material * 15)} Nm³/h`}
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="100" 
                      step="5"
                      value={config.material} 
                      onChange={(e) => handleConfigChange('material', parseInt(e.target.value))}
                      className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-[8px] text-gray-400 font-bold">
                      <span>300户</span>
                      <span>1500户</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] text-gray-500 font-bold">业务上线时效 / 交付周期</label>
                      <span className="text-[11px] font-black text-blue-600">{config.days} 天</span>
                    </div>
                    <input 
                      type="range" 
                      min="7" 
                      max="30" 
                      value={config.days} 
                      onChange={(e) => handleConfigChange('days', parseInt(e.target.value))}
                      className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-[8px] text-gray-400 font-bold">
                      <span>加急 (7天)</span>
                      <span>标准 (30天)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-bold block">{viewMode === 'business' ? '稳态保障精度' : '稳压精度 (AC)'}</label>
                    <select value={config.accuracy} onChange={(e) => handleConfigChange('accuracy', Number(e.target.value))} className="w-full text-[10px] font-medium border border-gray-200 rounded-lg p-2 bg-white outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                      <option value={10}>{viewMode === 'business' ? '标准稳态 (±10%)' : 'AC10'}</option>
                      <option value={5}>{viewMode === 'business' ? '极高稳态 (±5%)' : 'AC5'}</option>
                      <option value={2.5}>{viewMode === 'business' ? '实验室级 (±2.5%)' : 'AC2.5'}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-bold block">{viewMode === 'business' ? '管网适配压力' : '进口压力 (P1)'}</label>
                    <select value={config.inletPressure} onChange={(e) => handleConfigChange('inletPressure', e.target.value)} className="w-full text-[10px] font-medium border border-gray-200 rounded-lg p-2 bg-white outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                      <option value="0.2-0.4MPa">{viewMode === 'business' ? '城市中压 (0.2-0.4MPa)' : '中压A'}</option>
                      <option value="0.01-0.2MPa">{viewMode === 'business' ? '城市低压 (0.01-0.2MPa)' : '中压B'}</option>
                    </select>
                  </div>

            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 font-bold block">{viewMode === 'business' ? '结构冗余形式' : '结构形式'}</label>
              <select value={config.structure} onChange={(e) => handleConfigChange('structure', e.target.value)} className="w-full text-[10px] font-medium border border-gray-200 rounded-lg p-2 bg-white outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                <option value="1+0">{viewMode === 'business' ? '单路标准 (1+0)' : '单路'}</option>
                <option value="1+1">{viewMode === 'business' ? '一开一备 (1+1)' : '双路'}</option>
                <option value="2+0">{viewMode === 'business' ? '双路并联 (2+0)' : '并联'}</option>
              </select>
            </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-bold block">{viewMode === 'business' ? '预期使用寿命' : '材质选择'}</label>
                    <select value={config.materialType} onChange={(e) => handleConfigChange('materialType', e.target.value)} className="w-full text-[10px] font-medium border border-gray-200 rounded-lg p-2 bg-white outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                      <option value="carbon">{viewMode === 'business' ? '标准防腐 (8-10年)' : '碳钢'}</option>
                      <option value="stainless">{viewMode === 'business' ? '长效耐腐 (15-20年)' : '304不锈钢'}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-bold block">{viewMode === 'business' ? '极端天气保障' : '防冻保温配置'}</label>
                    <select value={config.insulation} onChange={(e) => handleConfigChange('insulation', e.target.value)} className="w-full text-[10px] font-medium border border-gray-200 rounded-lg p-2 bg-white outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                      <option value="basic">{viewMode === 'business' ? '标准保温 (0℃以上)' : '标准保温棉'}</option>
                      <option value="advanced">{viewMode === 'business' ? '智能防爆电伴热 (-20℃以下)' : '防爆电伴热系统'}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-bold block">{viewMode === 'business' ? '数智运维能力' : '远传监控模块'}</label>
                    <select value={config.telemetry} onChange={(e) => handleConfigChange('telemetry', e.target.value)} className="w-full text-[10px] font-medium border border-gray-200 rounded-lg p-2 bg-white outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                      <option value="basic">{viewMode === 'business' ? '人工抄表 (基础)' : '基础表计'}</option>
                      <option value="full">{viewMode === 'business' ? '5G全量数据远传' : 'NB-IoT/5G 模块'}</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2">
                      <Activity size={12} className="text-gray-600" />
                      <span className="text-[10px] font-bold text-gray-700">{viewMode === 'business' ? '环境静音能力' : '降噪模块'}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer scale-75">
                      <input type="checkbox" className="sr-only peer" checked={config.noiseReduction} onChange={(e) => handleConfigChange('noiseReduction', e.target.checked)} />
                      <div className="w-10 h-5.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200/50">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 shadow-sm">
                    <div className="text-[10px] font-bold text-blue-800 mb-2 flex items-center gap-1.5">
                      <Activity size={12} className="text-blue-500" /> 仿真推演结论
                    </div>
                    <p className="text-[10px] text-blue-700 leading-relaxed">
                      基于当前配置，该物资在 <span className="font-bold">极寒工况 (-20℃)</span> 下的保障率为 <span className="text-blue-600 font-bold">99.8%</span>，预计 5 年 TCO 降低 <span className="text-blue-600 font-bold">15%</span>。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4 shadow-sm">
          <div className="text-[11px] font-bold text-blue-800 mb-2 flex items-center gap-1.5"><Lightbulb size={12} className="text-blue-500" /> 全量物资业务逻辑共识</div>
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-[10px] text-blue-700 leading-relaxed">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></div>
              <p><strong>压力匹配共识：</strong>已验证法兰 PN2.5 与调压箱进口压力 0.4MPa 的机理兼容性，规避密封失效风险。</p>
            </div>
            <div className="flex items-start gap-2 text-[10px] text-blue-700 leading-relaxed">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></div>
              <p><strong>环境适应共识：</strong>针对极寒工况，全量关键件已同步“防爆电伴热”逻辑，确保零下20度运行稳定。</p>
            </div>
          </div>
        </div>

        <div className="h-48 mb-4">
          <AnimatePresence mode="wait">
            {isCalculating && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center gap-2 text-blue-500">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[11px] font-bold tracking-tight">BOM 全量 TCO 算账中...</span>
              </motion.div>
            )}
            {showResult && !isCalculating && (
              <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col gap-2">
                <div className="flex-1 border border-gray-100 rounded-2xl bg-white p-3 flex flex-col shadow-sm">
                  <div className="text-[10px] text-gray-400 mb-2 font-black uppercase tracking-widest">BOM 全生命周期成本 (TCO) 预测</div>
                  <div className="flex-1 flex items-end gap-3 pt-2 h-24">
                    <div className="flex-1 flex flex-col items-center h-full justify-end gap-1">
                      <span className="text-[10px] text-blue-600 font-black">¥{(initialCost/10000).toFixed(1)}万</span>
                      <div className="w-full h-16 relative flex items-end">
                        <div className="w-full bg-blue-500 rounded-t-lg" style={{ height: `${initialCostHeight}%` }}></div>
                      </div>
                      <span className="text-[9px] text-gray-400 font-bold">初期投入</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center h-full justify-end gap-1">
                      <span className="text-[10px] text-blue-600 font-black">¥{(maintCost/10000).toFixed(1)}万</span>
                      <div className="w-full h-16 relative flex items-end">
                        <div className="w-full bg-blue-400 rounded-t-lg" style={{ height: `${maintenanceCostHeight}%` }}></div>
                      </div>
                      <span className="text-[9px] text-gray-400 font-bold">3年运维</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center h-full justify-end gap-1">
                      <span className="text-[10px] text-teal-600 font-black">¥{(timeCost/10000).toFixed(1)}万</span>
                      <div className="w-full h-16 relative flex items-end">
                        <div className="w-full bg-teal-500 rounded-t-lg" style={{ height: `${timeCostHeight}%` }}></div>
                      </div>
                      <span className="text-[9px] text-gray-400 font-bold">风险/损失</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ButtonSolid onClick={() => onNext(config)} disabled={isCalculating || !showResult} className="w-full py-4 text-sm font-black tracking-widest uppercase shadow-blue-200 shadow-lg">确认仿真结果，生成需求说明书</ButtonSolid>

      </div>
    </Card>
  );
};

const BOMStep4Card = ({ scenarios, onConfirm, onPreviewSOP }: { scenarios: ScenarioState, onConfirm: () => void, onPreviewSOP: () => void }) => {
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);
  const [isCapabilitiesOpen, setIsCapabilitiesOpen] = useState(false);
  const [isValueOpen, setIsValueOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'business' | 'technical'>('business');

  const items = [
    {
      name: '燃气调压箱',
      type: '核心调压',
      specs: ['DN100', '2.0kPa出口', 'Q235B碳钢', scenarios.noise ? '双级消音' : '单级标准', scenarios.cold ? '电伴热+保温棉' : '标准防腐'],
      tech: '具备超压切断、低压切断、安全放散三位一体保护。切断精度 ≤ ±5%。',
      reasoning: {
        scenario: scenarios.cold ? "北方极寒地区老旧小区改造。" : "常规内陆环境改造。",
        knowledge: "设备自重较大（>1吨），长途物流成本高。根据《供应链优化模型》，建议本地化寻源以降低 TCO。",
        result: "锁定具备本地交付与维保能力的供应商规格。"
      }
    },
    {
      name: '智能流量计',
      type: '计量远传',
      specs: ['超声波', 'G65', scenarios.underground ? 'IP68全密封' : 'IP65', scenarios.power ? '双电源冗余' : '锂电供电'],
      tech: '支持温度、压力补偿，具备反向流检测与非法拆卸报警功能。',
      reasoning: {
        scenario: scenarios.underground ? "安装环境为地下调压柜或易积水区域。" : "地上安装环境。",
        knowledge: "地下受限空间易积水，需 IP68 等级确保电子元器件不失效。",
        result: scenarios.underground ? "升级为 IP68 全密封等级。" : "维持 IP65 标准等级。"
      }
    },
    {
      name: '加臭机',
      type: '安全注入',
      specs: ['柱塞泵', '0.01-10L/h', '316L不锈钢', scenarios.noise ? '隔音罩' : '标准'],
      tech: '全自动比例加注，支持 4-20mA 流量跟踪，具备药剂低液位报警。',
      reasoning: {
        scenario: scenarios.noise ? "紧邻居民楼（距离 < 5米）。" : "标准工业/市政间距。",
        knowledge: "柱塞泵运行伴随高频脉冲噪音，需加装隔音罩以符合《社会生活环境噪声排放标准》。",
        result: scenarios.noise ? "增配阻抗复合式隔音罩，降噪至 45dB 以下。" : "标准配置。"
      }
    }
  ];

  const GlobalMaterialRequirementDeduction = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border border-blue-100 rounded-lg overflow-hidden bg-white shadow-sm">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-2 flex justify-between items-center hover:bg-blue-50 transition-colors"
        >
          <div className="flex items-center gap-1 text-[10px] font-bold text-blue-900">
            <ShieldCheck size={10} className="text-blue-500" /> 项目全局配套需求推演
          </div>
          {isOpen ? <ChevronUp size={10} className="text-blue-400" /> : <ChevronDown size={10} className="text-blue-400" />}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ height: 0 }} 
              animate={{ height: 'auto' }} 
              exit={{ height: 0 }} 
              className="overflow-hidden border-t border-blue-50 bg-blue-50/10"
            >
              <div className="p-2 space-y-2">
                <div className="bg-white p-2 rounded-lg border border-blue-50 shadow-sm">
                  <div className="text-[9px] font-bold text-blue-800 uppercase tracking-wider mb-1">特殊工况与配套要求</div>
                  <p className="text-[10px] text-gray-700 leading-relaxed">针对老旧小区狭窄空间，调压箱采用侧开门设计；极寒工况下，全量关键件配套防爆电伴热系统。</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-blue-50 shadow-sm">
                  <div className="text-[9px] font-bold text-blue-800 uppercase tracking-wider mb-1">需求质量判别方案</div>
                  <p className="text-[10px] text-gray-700 leading-relaxed">全量物资需通过 1.5 倍压力强度试验，提供探伤报告与型式批准证书。</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-blue-50 shadow-sm">
                  <div className="text-[9px] font-bold text-blue-800 uppercase tracking-wider mb-1">最优能力规格 (质量/价格/交付)</div>
                  <p className="text-[10px] text-gray-700 leading-relaxed">质量等级 A，价格控制在预算内，10-20 天内分批交付。</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <Card className="mt-2 border-blue-100 shadow-xl overflow-hidden">
      <div className="p-3 sm:p-4 border-b border-blue-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-blue-50/30">
        <div className="flex items-center gap-2 min-w-0 w-full sm:w-auto">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner shrink-0"><FileText size={18} /></div>
          <div className="min-w-0 flex-1">
            <span className="font-black text-gray-900 text-sm sm:text-base block leading-none truncate">BOM 需求说明书</span>
            <span className="text-[9px] sm:text-[10px] text-blue-600 font-bold uppercase tracking-tighter block truncate">BOM Requirement Specification</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex bg-white/80 backdrop-blur-sm rounded-lg p-0.5 border border-blue-100 shrink-0">
            <button onClick={() => setViewMode('business')} className={`px-2 py-1 text-[9px] sm:text-[10px] font-bold rounded-md transition-all ${viewMode === 'business' ? 'bg-blue-600 shadow-sm text-white' : 'text-blue-600 hover:bg-blue-50'}`}>业务</button>
            <button onClick={() => setViewMode('technical')} className={`px-2 py-1 text-[9px] sm:text-[10px] font-bold rounded-md transition-all ${viewMode === 'technical' ? 'bg-blue-600 shadow-sm text-white' : 'text-blue-600 hover:bg-blue-50'}`}>技术</button>
          </div>
          <button onClick={onPreviewSOP} className="px-2 py-1 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg text-[9px] sm:text-[10px] font-bold flex items-center gap-1 hover:bg-blue-100 transition-all shrink-0">
            <ClipboardList size={10} /> SOP
          </button>
          <button className="px-2 py-1 bg-blue-600 text-white rounded-lg text-[9px] sm:text-[10px] font-bold flex items-center gap-1 hover:bg-blue-700 transition-all shadow-sm shrink-0">
            <Download size={10} /> 导出
          </button>
        </div>
      </div>
      
      <div className="p-3 sm:p-5 space-y-4 sm:space-y-6">
        {/* 意图定稿确认 - 顶部核心区域 */}
        <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10"><MessageSquare size={60} className="text-blue-600" /></div>
          <div className="flex items-center gap-2 text-[11px] font-black text-blue-600 mb-3 uppercase tracking-widest">
            <ShieldCheck size={14} /> 意图定稿确认
          </div>
          
          <div className="space-y-4 relative z-10">
            <p className="text-[13px] text-gray-700 leading-relaxed font-medium italic">
              “针对您在<span className="text-blue-600 font-bold">老旧小区</span>环境下对<span className="text-blue-600 font-bold">多品类物资批量供应</span>的极高要求，我已为您锁定了具备<span className="text-blue-800 font-bold underline decoration-blue-500 underline-offset-4">‘全量适配’</span>与<span className="text-blue-800 font-bold underline decoration-blue-500 underline-offset-4">‘敏捷交付’</span>核心能力的物资规格。”
            </p>

            <div className="flex flex-wrap gap-2 py-2">
              {['BOM全量解析', '极寒保障', '静音运行', '智能远传', 'TCO优化'].map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] text-blue-600 font-bold">#{tag}</span>
              ))}
            </div>

            <div className="bg-white rounded-xl p-3 border border-blue-100">
              <div className="text-[10px] text-blue-600 font-bold mb-2 flex items-center gap-1">
                <AlertTriangle size={12} /> 已识别并规避的隐式风险 (3)
              </div>
              <ul className="space-y-1.5">
                <li className="text-[10px] text-gray-600 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                  <span><span className="text-gray-900 font-bold">紧凑型模块化设计：</span>针对老旧小区狭小空间，规避大型设备无法入场风险。</span>
                </li>
                <li className="text-[10px] text-gray-600 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                  <span><span className="text-gray-900 font-bold">全量防冻对冲：</span>针对极寒天气，已强制要求“防爆电伴热”与“低温密封件”。</span>
                </li>
                <li className="text-[10px] text-gray-600 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                  <span><span className="text-gray-900 font-bold">双重消音架构：</span>针对居民区噪音敏感，已配置“双重消音”与“内壁隔音棉”。</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-3 border border-blue-100 mt-3">
              <div className="text-[10px] text-blue-600 font-bold mb-2 flex items-center gap-1">
                <Target size={12} /> 核心能力规格定义 (对标场景A)
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-gray-500 font-bold uppercase tracking-tighter text-[9px]">供能能力:</span>
                  <div className="text-right">
                    <div className="text-[12px] font-black text-gray-900">BOM全量协同供能</div>
                    <div className="text-[9px] text-blue-600 font-bold">保障项目全局稳定供气</div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-500 font-bold uppercase tracking-tighter text-[9px]">稳态保障:</span>
                  <div className="text-right">
                    <div className="text-[12px] font-black text-gray-900">全系统稳压精度 AC10</div>
                    <div className="text-[9px] text-blue-600 font-bold">波动范围 ≤±10%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-blue-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 border border-blue-500/20">
                <UserCheck size={20} />
              </div>
              <div>
                <div className="text-[11px] text-gray-900 font-bold">专家寄语</div>
                <div className="text-[10px] text-gray-500">“您的BOM意图已转化为专业规格，该方案已通过 19 项行业标准校验，可发起需求共识。”</div>
              </div>
            </div>
          </div>
        </div>

        {/* 物资明细区域 */}
        <div className="space-y-3">
          <div className="text-[11px] text-blue-600 font-bold flex items-center gap-1 px-1">
            <Box size={12} /> 物资明细能力定义：
          </div>

          <div className="flex gap-1 bg-blue-50 p-1 rounded-xl overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border border-blue-100">
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedItemIdx(idx)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all shrink-0 ${selectedItemIdx === idx ? 'bg-blue-600 text-white shadow-md' : 'text-blue-600 hover:bg-blue-100'}`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItemIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border-blue-100 shadow-sm overflow-hidden bg-white">
                <div className="p-3 bg-gradient-to-r from-blue-50/50 to-white border-b border-blue-50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-black text-blue-900">{items[selectedItemIdx].name}</span>
                    <span className="px-1.5 py-0.5 bg-blue-600 text-white rounded text-[8px] font-bold uppercase tracking-tighter">{items[selectedItemIdx].type}</span>
                  </div>
                  <button onClick={onPreviewSOP} className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-1">
                    <Eye size={10} /> 预览验收SOP
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {viewMode === 'business' ? (
                      <>
                        <div className="w-full space-y-2">
                          <div className="flex justify-between items-center text-[10px] bg-blue-50 p-2 rounded-lg border border-blue-100">
                            <span className="text-gray-500">核心供能能力:</span>
                            <span className="text-blue-600 font-bold">满足 1500 户居民高峰用气需求</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] bg-blue-50 p-2 rounded-lg border border-blue-100">
                            <span className="text-gray-500">极端工况保障:</span>
                            <span className="text-blue-600 font-bold">具备 -20℃ 极寒环境下持续供气能力</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] bg-blue-50 p-2 rounded-lg border border-blue-100">
                            <span className="text-gray-500">环境融合能力:</span>
                            <span className="text-blue-600 font-bold">静音运行，满足老旧小区近距离安装要求</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      items[selectedItemIdx].specs.map((s, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-50 border border-blue-100 rounded-md text-[9px] text-blue-700 font-bold shadow-sm">{s}</span>
                      ))
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                      <div className="flex items-center gap-1 text-blue-900 font-bold text-[10px]">
                        <Zap size={10} className="text-amber-500" /> 核心技术要求
                      </div>
                      <p className="text-[10px] text-gray-600 leading-relaxed">{items[selectedItemIdx].tech}</p>
                      <ReasoningBlock 
                        title="物资规格推演"
                        scenario={items[selectedItemIdx].reasoning.scenario}
                        knowledge={items[selectedItemIdx].reasoning.knowledge}
                        result={items[selectedItemIdx].reasoning.result}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <StandardItemsList />

        {/* 全局配套推演 */}
        <GlobalMaterialRequirementDeduction />

        {/* 附件部分：能力清单与客户价值 */}
        <div className="space-y-3 pt-4 border-t border-blue-100">
          <div className="border border-blue-100 rounded-xl overflow-hidden shadow-sm">
            <button 
              onClick={() => setIsCapabilitiesOpen(!isCapabilitiesOpen)}
              className="w-full p-2.5 sm:p-3 flex justify-between items-center bg-blue-50/50 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-2 text-[11px] font-bold text-blue-800">
                <Target size={14} /> 需能力清单 (附件)
              </div>
              {isCapabilitiesOpen ? <ChevronUp size={14} className="text-blue-400" /> : <ChevronDown size={14} className="text-blue-400" />}
            </button>
            <AnimatePresence>
              {isCapabilitiesOpen && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white">
                  <div className="p-2.5 sm:p-3 space-y-3">
                    <div className="flex items-start gap-3 p-2 border border-blue-50 rounded-xl bg-blue-50/20">
                      <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><Truck size={12} /></div>
                      <div>
                        <div className="text-[11px] font-bold text-gray-800">全量物资敏捷履约能力</div>
                        <div className="text-[10px] text-gray-600 leading-relaxed">具备多品类物资协同排产与到货能力，支持老旧小区复杂环境下的分批次精准交付。</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 border border-orange-50 rounded-xl bg-orange-50/20">
                      <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0"><Zap size={12} /></div>
                      <div>
                        <div className="text-[11px] font-bold text-gray-800">复杂工况适配能力</div>
                        <div className="text-[10px] text-gray-600 leading-relaxed">具备针对极寒、地下、高噪音环境的定制化生产能力，确保全量物资在特殊环境下性能不衰减。</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 border border-blue-50 rounded-xl bg-blue-50/20">
                      <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><ShieldCheck size={12} /></div>
                      <div>
                        <div className="text-[11px] font-bold text-gray-800">系统级安全保障能力</div>
                        <div className="text-[10px] text-gray-600 leading-relaxed">通过全量BOM的逻辑校验，规避压力等级不匹配等系统性风险，保障20年运行安全。</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border border-blue-100 rounded-xl overflow-hidden shadow-sm">
            <button 
              onClick={() => setIsValueOpen(!isValueOpen)}
              className="w-full p-3 flex justify-between items-center bg-blue-50/50 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-2 text-[11px] font-bold text-blue-800">
                <ShieldCheck size={14} /> 客户价值表 (附件)
              </div>
              {isValueOpen ? <ChevronUp size={14} className="text-blue-400" /> : <ChevronDown size={14} className="text-blue-400" />}
            </button>
            <AnimatePresence>
              {isValueOpen && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white">
                  <div className="p-3">
                    <table className="w-full text-[10px] border-collapse">
                      <thead>
                        <tr className="bg-blue-50 text-blue-800">
                          <th className="border border-blue-100 p-2 text-left">价值维度</th>
                          <th className="border border-blue-100 p-2 text-left">客户价值</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-blue-100 p-2 font-bold text-gray-800">安全与稳定</td>
                          <td className="border border-blue-100 p-2 text-gray-600">全系统机理兼容，确保老旧小区改造后 20 年运行无重大安全隐患。</td>
                        </tr>
                        <tr>
                          <td className="border border-blue-100 p-2 font-bold text-gray-800">经济与运维</td>
                          <td className="border border-blue-100 p-2 text-gray-600">智能远传减少 90% 人工抄表成本，预防性维护降低 40% 突发故障率。</td>
                        </tr>
                        <tr>
                          <td className="border border-blue-100 p-2 font-bold text-gray-800">社会与品牌</td>
                          <td className="border border-blue-100 p-2 text-gray-600">极速响应与静音设计，打造“民生工程”标杆，提升企业社会信誉。</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <ConsensusSection />

        <ButtonSolid onClick={onConfirm} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 shadow-lg py-3 text-[13px] font-black tracking-widest uppercase">
          需求共识
        </ButtonSolid>
      </div>
    </Card>
  );
};



const AdjustPrompt = ({ item, onSubmit }: { item: string, onSubmit: (val: string) => void }) => {
  const [val, setVal] = useState('');
  return (
    <Card className="mt-1 border-blue-100 shadow-sm">
      <div className="p-1 bg-blue-50 border-b border-blue-100 text-[9px] font-medium text-blue-800 flex items-center gap-1">
        <Sliders size={8} /> 调整【{item}】参数
      </div>
      <div className="p-1.5">
        <p className="text-[8px] text-gray-600 mb-1">请描述您的调整需求，例如：“去掉防冻加热”、“改成涡轮式”等。</p>
        <textarea 
          className="w-full text-[9px] p-1 border border-gray-200 rounded focus:outline-none focus:border-blue-400 mb-1 resize-none" 
          rows={2} 
          placeholder="输入调整诉求..."
          value={val}
          onChange={e => setVal(e.target.value)}
        />
        <ButtonSolid onClick={() => { if(val.trim()) onSubmit(val); }} className="w-full bg-blue-600 hover:bg-blue-700 py-1 text-[9px]">提交调整</ButtonSolid>
      </div>
    </Card>
  );
};

const StandardItemsList = () => {
  const [showStandardItems, setShowStandardItems] = useState(false);
  return (
    <div className="border-t border-blue-100 pt-3">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-bold text-blue-900 flex items-center gap-1.5">
            <CheckCircle size={14} className="text-blue-500" /> 标准品清单 (38项)
          </div>
          <button 
            onClick={() => setShowStandardItems(!showStandardItems)}
            className="text-[10px] text-blue-600 font-bold flex items-center gap-1 hover:underline"
          >
            {showStandardItems ? '收起详情' : '查看清单'}
            {showStandardItems ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
          </button>
        </div>
        <p className="text-[10px] text-blue-700 leading-relaxed mb-2">
          包含：无缝钢管、PE管、标准法兰等。系统已自动匹配 <span className="font-bold">GB/T 国家标准</span> 及历史需求优选品牌。
        </p>
        <AnimatePresence>
          {showStandardItems && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
               <div className="pt-2 text-[9px] text-gray-600 grid grid-cols-2 gap-2 border-t border-blue-100/50">
                <div className="bg-white p-2 rounded-lg border border-blue-50 flex justify-between items-center shadow-sm">
                  <span>无缝钢管 (20#)</span>
                  <span className="text-blue-500 font-bold">GB/T 8163</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-blue-50 flex justify-between items-center shadow-sm">
                  <span>PE燃气管 (SDR11)</span>
                  <span className="text-blue-500 font-bold">GB/T 15558</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-blue-50 flex justify-between items-center shadow-sm">
                  <span>平焊法兰 (PN2.5)</span>
                  <span className="text-blue-500 font-bold">GB/T 9119</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-blue-50 flex justify-between items-center shadow-sm">
                  <span>球阀 (DN50)</span>
                  <span className="text-blue-500 font-bold">GB/T 12237</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};





const RequirementAnalysisPhase = ({ 
  type, 
  onConfirm 
}: { 
  type: 'single' | 'bom', 
  onConfirm: () => void 
}) => {
  const [phase, setPhase] = useState(0);
  const [households, setHouseholds] = useState(type === 'bom' ? '约1000户' : '');
  const [usage, setUsage] = useState(type === 'bom' ? '做饭+采暖' : '');
  const [location, setLocation] = useState(type === 'bom' ? '靠近居民楼外墙' : '');
  const [temp, setTemp] = useState(type === 'bom' ? '-10℃左右' : '');
  const [customInput, setCustomInput] = useState('');

  const isFormComplete = type === 'bom' ? true : (households || usage || location || temp || customInput);

  useEffect(() => {
    if (phase === 0) {
      const timer = setTimeout(() => setPhase(1), 1500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const OptionGroup = ({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (v: string) => void }) => (
    <div className="mb-2.5">
      <div className="text-[11px] text-gray-600 mb-1.5 font-medium">{label}</div>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {options.map(opt => (
          <button 
            key={opt} 
            onClick={() => onChange(opt)} 
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] transition-all border ${value === opt ? 'bg-blue-50 border-blue-400 text-blue-700 font-bold shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden flex flex-col my-2">
      <div className="bg-gradient-to-r from-blue-50 to-white p-2.5 sm:p-3 border-b border-blue-100 flex items-center gap-2">
        <BrainCircuit size={16} className="text-blue-600" />
        <span className="text-[12px] sm:text-[13px] font-bold text-blue-900">
          {type === 'bom' ? 'BOM 需求解析与增强' : '需求解析与增强'}
        </span>
      </div>
      
      <div className="p-3 sm:p-4 space-y-4 sm:space-y-5">
        {/* Parsing Log */}
        <div className="text-[11px] font-mono text-gray-600 leading-relaxed bg-gray-50/80 p-2.5 sm:p-3 rounded-xl border border-gray-100">
          {type === 'bom' ? (
            <>
              <div className="text-blue-600 font-bold">{' > '}正在扫描 BOM 清单 (12项)...</div>
              {phase >= 1 && (
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                  {' > '}识别关键设备：调压箱, 流量计, 过滤器<br/>
                  {' > '}建立工况耦合模型...
                </motion.div>
              )}
            </>
          ) : (
            <>
              <div className="text-blue-600 font-bold">{' > '}调取「燃气设备」行业标准库...</div>
              {phase >= 1 && (
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                  {' > '}物资：燃气调压箱 (GAS-REG-01)<br/>
                  {' > '}评价维度：调压精度, 材质韧性, 伴热需求
                </motion.div>
              )}
            </>
          )}
        </div>

        {/* Interactive Parameters */}
        {phase >= 1 && (
          <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="space-y-3 sm:space-y-4">
            <div className="text-[11px] sm:text-[12px] font-bold text-gray-800 flex items-center gap-1.5 border-b border-gray-100 pb-1.5 sm:pb-2">
              <Target size={14} className="text-orange-500" /> 请确认或补充工况参数
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2">
              <OptionGroup label="覆盖户数" value={households} options={['约300户', '约500户', '1000户以上']} onChange={setHouseholds} />
              <OptionGroup label="用气场景" value={usage} options={['仅做饭', '做饭+采暖']} onChange={setUsage} />
              <OptionGroup label="安装位置" value={location} options={['绿化带/空地', '靠近居民楼外墙']} onChange={setLocation} />
              <OptionGroup label="冬季最低气温" value={temp} options={['0℃以上', '-10℃左右', '-20℃及以下']} onChange={setTemp} />
            </div>

            <div>
              <div className="text-[10px] sm:text-[11px] text-gray-600 mb-1.5 font-medium">补充文字要求 (选填)</div>
              <input 
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="例如：指定品牌、特殊材质要求..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2 sm:p-2.5 text-[11px] sm:text-[12px] outline-none focus:border-blue-400 focus:bg-white transition-colors"
              />
            </div>
          </motion.div>
        )}

        {/* Real-time Expert Deduction */}
        {phase >= 1 && (households || usage || location || temp || customInput) && (
          <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="bg-blue-50/40 rounded-xl p-3 sm:p-3.5 border border-blue-100/60 space-y-2 sm:space-y-3">
            <div className="text-[11px] sm:text-[12px] font-bold text-blue-800 flex items-center gap-1.5 mb-1">
              <Sparkles size={14} className="text-blue-600" /> 专家实时推演
            </div>
            
            <div className="space-y-2 sm:space-y-2.5">
              {(households || usage) && (
                <motion.div initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}} className="bg-white p-2 sm:p-2.5 rounded-xl border border-blue-100/80 flex gap-2 sm:gap-2.5 items-start shadow-sm">
                  <Wind size={14} className="text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-gray-800">供能能力增强</div>
                    <div className="text-[10px] sm:text-[11px] text-gray-600 mt-0.5 sm:mt-1 leading-relaxed">
                      基于 {households && <span className="text-blue-600 font-medium">[{households}]</span>} {usage && <span className="text-blue-600 font-medium">[{usage}]</span>}，建议调压流量规格提升至 <span className="text-blue-600 font-bold">1200Nm³/h</span>。
                    </div>
                  </div>
                </motion.div>
              )}
              
              {(temp === '-10℃左右' || temp === '-20℃及以下') && (
                <motion.div initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}} className="bg-white p-2 sm:p-2.5 rounded-xl border border-blue-100/80 flex gap-2 sm:gap-2.5 items-start shadow-sm">
                  <Zap size={14} className="text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-gray-800">极寒工况对冲</div>
                    <div className="text-[10px] sm:text-[11px] text-gray-600 mt-0.5 sm:mt-1 leading-relaxed">
                      基于气温 <span className="text-blue-600 font-medium">[{temp}]</span>，需增加 <span className="text-blue-600 font-bold">防爆电伴热系统</span>，并升级密封件材质为耐低温型。
                    </div>
                  </div>
                </motion.div>
              )}

              {location === '靠近居民楼外墙' && (
                <motion.div initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}} className="bg-white p-2 sm:p-2.5 rounded-xl border border-blue-100/80 flex gap-2 sm:gap-2.5 items-start shadow-sm">
                  <Activity size={14} className="text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-gray-800">环境噪音对冲</div>
                    <div className="text-[10px] sm:text-[11px] text-gray-600 mt-0.5 sm:mt-1 leading-relaxed">
                      基于位置 <span className="text-blue-600 font-medium">[{location}]</span>，建议配置 <span className="text-blue-600 font-bold">双重消音架构</span>，满足夜间噪音标准。
                    </div>
                  </div>
                </motion.div>
              )}

              {customInput && (
                <motion.div initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}} className="bg-white p-2 sm:p-2.5 rounded-xl border border-blue-100/80 flex gap-2 sm:gap-2.5 items-start shadow-sm">
                  <Box size={14} className="text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-gray-800">自定义需求解析</div>
                    <div className="text-[10px] sm:text-[11px] text-gray-600 mt-0.5 sm:mt-1 leading-relaxed">
                      针对要求 <span className="text-blue-600 font-medium">[{customInput}]</span>，已在供应链优选库中进行匹配。
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Confirmation Button */}
        {isFormComplete && phase >= 1 && (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="pt-2">
            <button 
              onClick={onConfirm}
              className="w-full py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl text-[12px] sm:text-[13px] font-bold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              确认参数，生成仿真方案 <ChevronRight size={16} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSOP, setShowSOP] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sessions, setSessions] = useState<{id: string, title: string, status: '进行中' | '已完成' | '待评审', time: string}[]>([
    { id: '1', title: '城南小区二期改造 - 调压箱需求', status: '待评审', time: '2分钟前' },
    { id: '2', title: '管网配套BOM清单解析', status: '进行中', time: '1小时前' },
    { id: '3', title: '北区供水泵站扩容方案', status: '已完成', time: '昨天' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  const addMessage = (type: MessageType, content: React.ReactNode) => setMessages(prev => [...prev, { id: Date.now().toString(), type, content }]);
  const simulateAI = (content: React.ReactNode, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => { setIsTyping(false); addMessage('ai', content); }, delay);
  };

  const continueJourneyFromHouseholds = (onFinish?: () => void) => {
    simulateAI(
      <div>
        <div className="mb-2 text-xs font-bold text-blue-600">「需求解析与增强」</div>
        <p className="text-sm mb-2 text-gray-700">已为您调取物资标准库。请确认以下工况参数，我将为您进行实时专家推演：</p>
        <RequirementAnalysisPhase type="single" onConfirm={() => {
          addMessage('user', "参数已确认，请生成仿真方案。");
          simulateAI(
            <div>
              <div className="mb-2 text-xs font-bold text-blue-600">「需求仿真呈现」</div>
              <p className="text-sm mb-2 text-gray-700">正在为您生成全景仿真呈现，已匹配最优供应链模型：</p>
              <Step3Card onNext={() => {
                addMessage('user', "方案无误，发起多方共识。");
                simulateAI(
                  <div>
                    <div className="mb-2 text-xs font-bold text-blue-600">「需求共识」</div>
                    <p className="text-sm mb-2 text-gray-700">已为您生成标准需求说明书（SOP），并同步至相关决策人：</p>
                    <Step4Card 
                      config={{
                        days: 15,
                        material: 40,
                        accuracy: 10,
                        inletPressure: '0.2-0.4MPa',
                        structure: '1+1',
                        materialType: 'carbon',
                        insulation: 'advanced',
                        telemetry: 'full',
                        noiseReduction: true
                      }} 
                      onPreviewSOP={() => setShowSOP(true)} 
                      onConfirm={() => {
                        simulateAI(
                          <div className="space-y-2">
                            <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                                <CheckCircle size={20} />
                              </div>
                              <div>
                                <div className="text-sm font-bold text-blue-800">需求共识已发起</div>
                                <div className="text-[10px] text-blue-600">已同步至相关决策人</div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              您的需求已转化为专业的能力标尺。正在进行供能力匹配，并同步发送了需求说明书。
                            </p>
                          </div>
                        );
                        if (onFinish) onFinish();
                      }} 
                    />
                  </div>
                );
              }} />
            </div>
          );
        }} />
      </div>
    );
  };

  const startJourney = () => {
    simulateAI(<div><div className="mb-2 text-xs font-bold text-blue-600">「需求解析与增强」</div><PreJourneyCard onConfirm={() => {
      addMessage('user', "是的，我要进行单项需求解析。居民小区改造用，最近冬天老降温，怕冻坏了影响供气，要尽快到货。");
      simulateAI(
        <div>
          <div className="mb-2 text-xs font-bold text-blue-600">「需求解析与增强」</div>
          <MaterialConfirmationCard material="燃气调压箱" onConfirm={() => {
            addMessage('user', "物资确认无误，开始增强推演。");
            continueJourneyFromHouseholds();
          }} />
        </div>
      );
    }} /></div>);
  };

  const startBOMJourney = () => {
    simulateAI(
      <div>
        <div className="mb-2 text-xs font-bold text-blue-600">「需求解析与增强」</div>
        <p className="text-sm mb-2 text-gray-700">已自动关联项目库：<span className="font-bold text-blue-600">“城南老旧小区改造二期工程”</span>。正在启动全量推演引擎，请确认核心工况：</p>
        <RequirementAnalysisPhase type="bom" onConfirm={() => {
          addMessage('user', "BOM参数已确认，请生成全景仿真方案。");
          simulateAI(
            <div>
              <div className="mb-2 text-xs font-bold text-blue-600">「需求仿真呈现」</div>
              <p className="text-sm mb-2 text-gray-700">正在为您生成BOM全景仿真呈现，已匹配最优供应链模型：</p>
              <BOMStep3Card onNext={() => {
                addMessage('user', "BOM方案无误，发起全量需求共识。");
                simulateAI(
                  <div>
                    <div className="mb-2 text-xs font-bold text-blue-600">「需求共识」</div>
                    <p className="text-sm mb-2 text-gray-700">已为您生成BOM标准需求说明书，并同步至相关决策人：</p>
                    <BOMStep4Card 
                      scenarios={{ cold: true, noise: true, underground: false, power: true }} 
                      onPreviewSOP={() => setShowSOP(true)} 
                      onConfirm={() => {
                        simulateAI(
                          <div className="space-y-2">
                            <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                                <CheckCircle size={20} />
                              </div>
                              <div>
                                <div className="text-sm font-bold text-blue-800">需求共识已发起</div>
                                <div className="text-[10px] text-blue-600">已同步至相关决策人</div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              您的BOM全量需求已转化为专业的能力标尺。正在进行供能力匹配，并同步发送了需求说明书。
                            </p>
                          </div>
                        );
                      }} 
                    />
                  </div>
                );
              }} />
            </div>
          );
        }} />
      </div>
    );
  };

  const handleInputSubmit = (text: string) => {
    if (!text.trim()) return;
    addMessage('user', text);
    startJourney();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-900 max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '-100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '-100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-64 bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 bg-blue-600 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-black">需智采购专家</div>
                    <div className="text-[10px] opacity-70">v1.2 Enterprise</div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                <div className="px-3 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">工作台</div>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs">
                  <MessageSquare size={16} /> 会话管理
                </button>
                <div className="px-2 space-y-1">
                  {sessions.map(session => {
                    let statusColor = 'bg-blue-50 text-blue-600';
                    let StatusIcon = Activity;
                    
                    if (session.status === '已完成') {
                      statusColor = 'bg-green-50 text-green-600';
                      StatusIcon = CheckCircle;
                    } else if (session.status === '待评审') {
                      statusColor = 'bg-orange-50 text-orange-600';
                      StatusIcon = Eye;
                    } else if (session.status === '进行中') {
                      statusColor = 'bg-blue-50 text-blue-600';
                      StatusIcon = Loader2;
                    }

                    return (
                      <button 
                        key={session.id}
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group"
                      >
                        <div className="text-[10px] font-bold text-gray-800 truncate group-hover:text-blue-600">{session.title}</div>
                        <div className="flex justify-between items-center mt-1">
                          <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full font-bold text-[8px] ${statusColor}`}>
                            <StatusIcon size={8} className={session.status === '进行中' ? 'animate-spin' : ''} />
                            <span>{session.status}</span>
                          </div>
                          <span className="text-[8px] text-gray-400">{session.time}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-xs">
                  <ClipboardList size={16} /> 需求台账
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-xs">
                  <Box size={16} /> 知识库管理
                </button>
                
                <div className="px-3 py-2 mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">系统建议</div>
                <div className="mx-2 p-3 bg-orange-50 rounded-xl border border-orange-100">
                  <div className="text-[10px] font-bold text-orange-800 mb-1 flex items-center gap-1">
                    <Lightbulb size={12} /> 功能补全建议
                  </div>
                  <p className="text-[9px] text-orange-700 leading-relaxed">
                    当前功能已覆盖需求解析与仿真，建议增加“供应商履约风险实时监控”模块，以闭环全生命周期管理。
                  </p>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-100">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-50 text-xs">
                  <RefreshCw size={14} /> 检查更新
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsMenuOpen(true)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Menu size={20} className="text-gray-600" />
          </button>
          <h1 className="font-semibold text-gray-800 text-lg">智能伙伴 - 需智</h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">智</div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth pb-32">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mb-4">
              <Sparkles size={32} />
            </div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">欢迎使用需智智能体</h2>
            <p className="text-sm text-gray-500 max-w-[250px]">
              输入您的模糊诉求，或上传 BOM 清单，我将为您精准定需、智能推演并达成需求共识。
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] rounded-2xl p-3.5 shadow-sm ${msg.type === 'user' ? 'bg-blue-500 text-white rounded-tr-sm' : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100'}`}>
                  {typeof msg.content === 'string' ? <p className="text-sm leading-relaxed">{msg.content}</p> : msg.content}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 shadow-sm flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </main>

      <AnimatePresence>
        {showSOP && <SOPDetailView onClose={() => setShowSOP(false)} />}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-200 p-3 shrink-0 z-20">
        {/* Quick Action Buttons */}
        <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar pb-1">
          <button 
            onClick={() => simulateAI(<div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[10px] text-blue-800 font-bold flex items-center gap-2"><Sparkles size={14} /> 已加载：调压设备行业规范知识库 (GB50028)</div>)}
            className="shrink-0 px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all flex items-center gap-1 shadow-sm active:scale-95"
          >
            <Plus size={10} /> 专属品类知识
          </button>
          <button 
            onClick={() => simulateAI(<div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[10px] text-blue-800 font-bold flex items-center gap-2"><ClipboardList size={14} /> 已关联项目：城南老旧小区改造二期工程 (2026-Q1)</div>)}
            className="shrink-0 px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all flex items-center gap-1 shadow-sm active:scale-95"
          >
            <Plus size={10} /> 项目上下文
          </button>
          <button 
            onClick={() => simulateAI(<div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[10px] text-blue-800 font-bold flex items-center gap-2"><Settings size={14} /> 已应用：集团标准化采购偏好 (优先国产、低碳、长寿命)</div>)}
            className="shrink-0 px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all flex items-center gap-1 shadow-sm active:scale-95"
          >
            <Plus size={10} /> 偏好设定
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              addMessage('user', <div className="flex items-center gap-2"><FileSpreadsheet size={16} className="text-green-600" /> <span>管网配套BOM清单.xlsx</span></div>);
              startBOMJourney();
            }}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all shrink-0 border border-gray-200"
          >
            <Paperclip size={18} />
          </button>
          <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:border-blue-400 focus-within:bg-white transition-all">
            <input 
              type="text" 
              placeholder="描述您的业务场景（如：城南小区改造）" 
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400" 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleInputSubmit(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
            <button 
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                handleInputSubmit(input.value);
                input.value = '';
              }}
              className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0 hover:bg-blue-600 transition-all"
            >
              <ChevronUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

