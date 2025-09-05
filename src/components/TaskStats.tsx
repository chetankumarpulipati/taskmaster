import React, { useEffect, useState } from 'react';
import {
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiTrendingUp,
  FiFlag,
  FiPieChart
} from 'react-icons/fi';
import { getTaskStats } from '../db';

interface StatsData {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  priorityStats: {
    high: number;
    medium: number;
    low: number;
  };
  categoryStats: Record<string, number>;
}

const TaskStats: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getTaskStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  if (!stats) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  const priorityTotal = stats.priorityStats.high + stats.priorityStats.medium + stats.priorityStats.low;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <FiPieChart className="w-5 h-5 text-blue-600" />
        Task Statistics
      </h2>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Total Tasks */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Tasks</p>
              <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
            </div>
            <FiTrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Completed</p>
              <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
            </div>
            <FiCheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-2">
            <div className="text-xs text-green-600">{completionRate}% complete</div>
            <div className="w-full bg-green-200 rounded-full h-1.5 mt-1">
              <div
                className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
            </div>
            <FiClock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        {/* Overdue Tasks */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Overdue</p>
              <p className="text-2xl font-bold text-red-700">{stats.overdue}</p>
            </div>
            <FiAlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Priority Breakdown */}
      {priorityTotal > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center gap-2">
            <FiFlag className="w-4 h-4" />
            Priority Breakdown
          </h3>
          <div className="space-y-3">
            {/* High Priority */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                High Priority
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{stats.priorityStats.high}</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(stats.priorityStats.high / priorityTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Medium Priority */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                Medium Priority
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{stats.priorityStats.medium}</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(stats.priorityStats.medium / priorityTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Low Priority */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Low Priority
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{stats.priorityStats.low}</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(stats.priorityStats.low / priorityTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Breakdown */}
      {Object.keys(stats.categoryStats).length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Category Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(stats.categoryStats)
              .filter(([_, count]) => count > 0)
              .map(([category, count]) => (
                <div key={category} className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 capitalize">{category}</div>
                  <div className="text-lg font-semibold text-gray-800">{count}</div>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* Empty State */}
      {stats.total === 0 && (
        <div className="text-center py-8">
          <FiPieChart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No tasks yet. Create your first task to see statistics!</p>
        </div>
      )}
    </div>
  );
};

export default TaskStats;
