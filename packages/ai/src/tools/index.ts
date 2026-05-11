import type { ToolDefinition } from '../openrouter';

// Import all tool definitions
import { explainConceptTool, executeExplainConcept } from './explain-concept';
import { solveExerciseTool, executeSolveExercise } from './solve-exercise';
import { generateQuizTool, executeGenerateQuiz } from './generate-quiz';
import { createFlashcardTool, executeCreateFlashcard } from './create-flashcard';
import { generateMindmapTool, executeGenerateMindmap } from './generate-mindmap';
import { correctEssayTool, executeCorrectEssay } from './correct-essay';
import { createStudyPlanTool, executeCreateStudyPlan } from './create-study-plan';
import { simulateExamTool, executeSimulateExam } from './simulate-exam';
import { searchKnowledgeTool, executeSearchKnowledge } from './search-knowledge';
import { summarizeContentTool, executeSummarizeContent } from './summarize-content';
import { generateImageTool, executeGenerateImage } from './generate-image';
import { textToSpeechTool, executeTextToSpeech } from './text-to-speech';
import { speechToTextTool, executeSpeechToText } from './speech-to-text';
import { generateSlidesTool, executeGenerateSlides } from './generate-slides';
import { createActivityTool, executeCreateActivity } from './create-activity';
import { analyzePerformanceTool, executeAnalyzePerformance } from './analyze-performance';
import { suggestResourcesTool, executeSuggestResources } from './suggest-resources';
import { explainWithAnalogyTool, executeExplainWithAnalogy } from './explain-with-analogy';
import { createTimelineTool, executeCreateTimeline } from './create-timeline';
import { debateTopicTool, executeDebateTopic } from './debate-topic';
import { motivateStudentTool, executeMotivateStudent } from './motivate-student';
import { trackProgressTool, executeTrackProgress } from './track-progress';

// Export all tool definitions
export const tools: ToolDefinition[] = [
  explainConceptTool,
  solveExerciseTool,
  generateQuizTool,
  createFlashcardTool,
  generateMindmapTool,
  correctEssayTool,
  createStudyPlanTool,
  simulateExamTool,
  searchKnowledgeTool,
  summarizeContentTool,
  generateImageTool,
  textToSpeechTool,
  speechToTextTool,
  generateSlidesTool,
  createActivityTool,
  analyzePerformanceTool,
  suggestResourcesTool,
  explainWithAnalogyTool,
  createTimelineTool,
  debateTopicTool,
  motivateStudentTool,
  trackProgressTool,
];

// Tool execution registry
export const toolExecutors: Record<string, (args: any) => Promise<any>> = {
  explain_concept: executeExplainConcept,
  solve_exercise: executeSolveExercise,
  generate_quiz: executeGenerateQuiz,
  create_flashcard: executeCreateFlashcard,
  generate_mindmap: executeGenerateMindmap,
  correct_essay: executeCorrectEssay,
  create_study_plan: executeCreateStudyPlan,
  simulate_exam: executeSimulateExam,
  search_knowledge: executeSearchKnowledge,
  summarize_content: executeSummarizeContent,
  generate_image: executeGenerateImage,
  text_to_speech: executeTextToSpeech,
  speech_to_text: executeSpeechToText,
  generate_slides: executeGenerateSlides,
  create_activity: executeCreateActivity,
  analyze_performance: executeAnalyzePerformance,
  suggest_resources: executeSuggestResources,
  explain_with_analogy: executeExplainWithAnalogy,
  create_timeline: executeCreateTimeline,
  debate_topic: executeDebateTopic,
  motivate_student: executeMotivateStudent,
  track_progress: executeTrackProgress,
};

// Execute a tool by name
export async function executeTool(toolName: string, args: any): Promise<any> {
  const executor = toolExecutors[toolName];
  if (!executor) {
    throw new Error(`Tool not found: ${toolName}`);
  }
  return executor(args);
}