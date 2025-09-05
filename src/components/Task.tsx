import React, { useState } from 'react';
import {
  FiCheck,
  FiTrash2,
  FiEdit3,
  FiCalendar,
  FiFlag,
  FiTag,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';
import {
  MdWork,
  MdPerson,
  MdShoppingCart,
  MdHealthAndSafety,
  MdSchool,
  MdMoreHoriz
} from 'react-icons/md';
import { Task as TaskType, Priority, Category } from '../db';

interface TaskProps {
  task: TaskType;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: TaskType) => void;
}

const priorityColors: Record<Priority, string> = {
  high: 'text-red-500 bg-red-50 border-red-200',
  medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  low: 'text-green-500 bg-green-50 border-green-200',
};

const categoryIcons: Record<Category, React.ReactElement> = {
  work: <MdWork className="w-4 h-4" />,
  personal: <MdPerson className="w-4 h-4" />,
  shopping: <MdShoppingCart className="w-4 h-4" />,
  health: <MdHealthAndSafety className="w-4 h-4" />,
  education: <MdSchool className="w-4 h-4" />,
  other: <MdMoreHoriz className="w-4 h-4" />,
};

const categoryColors: Record<Category, string> = {
  work: 'text-blue-600 bg-blue-50',
  personal: 'text-purple-600 bg-purple-50',
  shopping: 'text-orange-600 bg-orange-50',
  health: 'text-green-600 bg-green-50',
  education: 'text-indigo-600 bg-indigo-50',
  other: 'text-gray-600 bg-gray-50',
};

const Task: React.FC<TaskProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  const isDueSoon = task.dueDate &&
    new Date(task.dueDate) <= new Date(Date.now() + 24 * 60 * 60 * 1000) &&
    new Date(task.dueDate) > new Date() &&
    !task.completed;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTaskCardClasses = () => {
    let classes = 'task-card animate-slide-up';

    if (task.completed) {
      classes += ' task-card-completed opacity-75';
    } else {
      if (task.priority === 'high') classes += ' task-card-high-priority';
      else if (task.priority === 'medium') classes += ' task-card-medium-priority';
      else classes += ' task-card-low-priority';
    }

    if (isOverdue) {
      classes += ' bg-red-50 border-red-200';
    } else if (isDueSoon) {
      classes += ' bg-yellow-50 border-yellow-200';
    }

    return classes;
  };

  return (
    <div className={getTaskCardClasses()}>
      <div className="flex items-start gap-3">
        {/* Completion Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-0.5 ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
          }`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && <FiCheck className="w-4 h-4" />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {/* Main Task Info */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3
                className={`font-medium text-gray-900 cursor-pointer transition-colors ${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {task.text}
              </h3>

              {/* Metadata Row */}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {/* Priority Badge */}
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                  <FiFlag className="w-3 h-3" />
                  {task.priority}
                </span>

                {/* Category Badge */}
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${categoryColors[task.category]}`}>
                  {React.cloneElement(categoryIcons[task.category], { className: 'w-3 h-3' })}
                  {task.category}
                </span>

                {/* Due Date */}
                {task.dueDate && (
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    isOverdue 
                      ? 'text-red-600 bg-red-100' 
                      : isDueSoon 
                        ? 'text-yellow-600 bg-yellow-100' 
                        : 'text-gray-600 bg-gray-100'
                  }`}>
                    {isOverdue ? (
                      <FiAlertCircle className="w-3 h-3" />
                    ) : (
                      <FiCalendar className="w-3 h-3" />
                    )}
                    {formatDate(task.dueDate)}
                  </span>
                )}

                {/* Created Time */}
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs text-gray-500 bg-gray-50">
                  <FiClock className="w-3 h-3" />
                  {formatDate(task.createdAt)}
                </span>
              </div>

              {/* Tags */}
              {task.tags && task.tags.length > 0 && (
                <div className="flex items-center gap-1 mt-2 flex-wrap">
                  <FiTag className="w-3 h-3 text-gray-400" />
                  {task.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Expanded Description */}
              {isExpanded && task.description && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{task.description}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => onEdit(task)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Edit task"
              >
                <FiEdit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Delete task"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;