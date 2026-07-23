import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Zap,
  Gauge,
  Droplets,
  Thermometer,
  Activity,
  FlaskConical,
  BrainCircuit,
  FileText,
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  BarChart3, // ✅ NEW ICON
  Boxes,
} from "lucide-react";

import { useData } from "@/store/DataContext";
import type { NavigationPage } from "@/types/generator";
import ExcelUploader from "./ExcelUploader";

interface NavItem {
  id: NavigationPage;
  label: string;
  icon: any;
  group: string;
}

// ✅ UPDATED NAV ITEMS
const navItems: NavItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    group: "Dashboard",
  },

  { id: "electrical", label: "Electrical", icon: Zap, group: "Analytics" },
  { id: "performance", label: "Performance", icon: Gauge, group: "Analytics" },
  { id: "oil", label: "Oil System", icon: Droplets, group: "Analytics" },
  {
    id: "environment",
    label: "Environment",
    icon: Thermometer,
    group: "Analytics",
  },
  { id: "mechanical", label: "Mechanical", icon: Activity, group: "Analytics" },
  {
    id: "tests",
    label: "Test Analytics",
    icon: FlaskConical,
    group: "Analytics",
  },

  // ✅ 🔥 NEW COMPARISON PAGE
  {
    id: "comparison",
    label: "Comparison",
    icon: BarChart3,
    group: "Analytics",
  },
  {
    id: "subsystem",
    label: "Subsystem",
    icon: Boxes,
    group: "Analytics", // or any group you want
  },

  {
    id: "advanced",
    label: "Advanced",
    icon: BrainCircuit,
    group: "Intelligence",
  },
  { id: "reports", label: "Reports", icon: FileText, group: "Output" },
];

export default function Navigation() {
  const {
    currentPage,
    setCurrentPage,
    isNavExpanded,
    setIsNavExpanded,
    data,
    clearData,
  } = useData();

  const groups = [...new Set(navItems.map((i) => i.group))];

  return (
    <motion.nav
      initial={false}
      animate={{ width: isNavExpanded ? 240 : 68 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen bg-white border-r border-border z-40 flex flex-col overflow-hidden"
    >
      {/* ✅ LOGO */}
      <div className="h-14 flex items-center px-4 border-b border-[#F1F5F9]">
        <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
          <Activity size={18} className="text-white" />
        </div>

        <AnimatePresence>
          {isNavExpanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="ml-3 text-[15px] font-bold text-[#0F172A]"
            >
              GenAnalytics
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* ✅ NAV ITEMS */}
      <div className="flex-1 overflow-y-auto py-4 px-2.5">
        {groups.map((group) => (
          <div key={group} className="mb-5">
            {isNavExpanded && (
              <div className="text-[10px] text-text-tertiary px-3 mb-2 uppercase">
                {group}
              </div>
            )}

            {navItems
              .filter((i) => i.group === group)
              .map((item) => {
                const isActive = currentPage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center gap-3 rounded-xl mb-1 transition-all
                      ${isNavExpanded ? "px-3 py-2.5" : "justify-center py-2.5"}
                      ${
                        isActive
                          ? "bg-[#EFF6FF] text-accent"
                          : "text-[#64748B] hover:bg-[#F8FAFC]"
                      }`}
                  >
                    <item.icon size={18} />

                    {isNavExpanded && (
                      <span className="text-[13px]">{item.label}</span>
                    )}
                  </button>
                );
              })}
          </div>
        ))}
      </div>

      {/* ✅ BOTTOM */}
      <div className="border-t border-[#F1F5F9] p-2.5 space-y-1">
        {data && (
          <button
            onClick={clearData}
            className={`w-full flex items-center gap-3 text-[#DC2626]
              ${isNavExpanded ? "px-3 py-2.5" : "justify-center py-2.5"}`}
          >
            <X size={16} />
            {isNavExpanded && <span>Clear Data</span>}
          </button>
        )}

        <ExcelUploader>
          <div
            className={`w-full flex items-center gap-3 text-[#2563EB]
    ${isNavExpanded ? "px-3 py-2.5" : "justify-center py-2.5"}`}
          >
            <Upload size={16} />

            {isNavExpanded && <span>Upload New Excel</span>}
          </div>
        </ExcelUploader>

        <button
          onClick={() => setIsNavExpanded(!isNavExpanded)}
          className="w-full flex items-center justify-center py-2"
        >
          {isNavExpanded ? (
            <ChevronLeft size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>
      </div>
    </motion.nav>
  );
}
