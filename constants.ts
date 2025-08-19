
import type { ExperimentData } from './types';

export const experimentData: ExperimentData = {
    title: 'SMAC Experiment Architecture: AMAL vs MAPPO',
    sections: [
        {
            id: 'goal',
            title: 'Goal & Expected Performance',
            content: {
                text: "Compare AMAL (Asymmetric Multi-Agent Learning) with MAPPO baseline on SMAC scenarios to validate the paper's claims of 40% better sample efficiency.",
                list: [
                    "MAPPO on SMAC: 75.4% win rate",
                    "AMAL target: 81.6% win rate (~8% improvement)",
                    "Sample efficiency: 40% fewer samples to reach 90% performance"
                ]
            }
        },
        {
            id: 'architecture',
            title: 'Architecture Overview',
            content: {
                structure: `
smac_experiments/
├── core/
│   ├── __init__.py
│   ├── base_algorithm.py      # Abstract base class
│   ├── amal_agent.py          # AMAL implementation
│   └── mappo_baseline.py      # MAPPO implementation
├── environments/
│   ├── __init__.py
│   └── smac_wrapper.py        # SMAC environment wrapper
├── networks/
│   ├── __init__.py
│   ├── world_model.py         # AMAL world model
│   ├── policy_net.py          # Shared policy architecture
│   └── critic_net.py          # Shared critic architecture
├── utils/
│   ├── __init__.py
│   ├── replay_buffer.py       # Asymmetric replay buffer
│   ├── mi_estimator.py        # Mutual information estimator
│   └── logger.py              # Experiment logging
├── configs/
│   ├── amal_config.yaml       # AMAL hyperparameters
│   ├── mappo_config.yaml      # MAPPO hyperparameters
│   └── smac_scenarios.yaml    # SMAC scenario configs
├── run_experiment.py           # Main experiment runner
└── plot_results.py            # Result visualization
`
            }
        },
        {
            id: 'interfaces',
            title: 'Core Interfaces',
            content: {
                text: "Here are the core interfaces defined for the experiment.",
                code: {
                    language: 'python',
                    code: `
from abc import ABC, abstractmethod
import torch.nn as nn
from typing import Dict, Tuple, Optional

class BaseMAAlgorithm(ABC):
    """Base class for multi-agent algorithms"""
    
    @abstractmethod
    def __init__(self, config: dict):
        """Initialize algorithm with config"""
        pass
    
    @abstractmethod
    def select_actions(
        self, 
        obs: Dict[int, torch.Tensor],
        available_actions: Optional[Dict[int, torch.Tensor]] = None
    ) -> Dict[int, torch.Tensor]:
        """Select actions for all agents"""
        pass
    
    @abstractmethod
    def update(self, batch: Dict) -> Dict[str, float]:
        """Update algorithm parameters"""
        pass

class AsymmetricReplayBuffer:
    """Replay buffer with asymmetric data handling"""
    
    def add_primary(self, transition: Dict):
        """Add primary agent experience"""
        
    def add_auxiliary(self, agent_id: int, transition: Dict):
        """Add auxiliary agent experience"""
        
    def sample_primary(self, batch_size: int) -> Dict:
        """Sample ONLY from primary buffer"""

class WorldModel(nn.Module):
    """World model for AMAL"""
    
    def forward(self, obs: torch.Tensor, action: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor]:
        """Predict next observation and reward"""
        
    def compute_loss(self, batch: Dict) -> torch.Tensor:
        """Compute prediction loss"""
`
                }
            }
        },
        {
            id: 'scenarios',
            title: 'SMAC Scenarios for Testing',
            content: {
                table: {
                    headers: ["Difficulty", "Scenarios"],
                    rows: [
                        ["Easy (2-3 agents)", "2s3z: 2 Stalkers vs 3 Zealots, 3m: 3 Marines"],
                        ["Medium (5-10 agents)", "5m_vs_6m, 8m, 2s_vs_1sc"],
                        ["Hard (10+ agents)", "3s5z, MMM, 27m_vs_30m"],
                        ["Super Hard", "corridor, 6h_vs_8z"]
                    ]
                }
            }
        },
        {
            id: 'prompts',
            title: 'Implementation Prompts',
            content: {
                text: "Step-by-step prompts for generating the implementation using an AI model like Claude 3.5 Sonnet.",
                code: {
                    language: 'bash',
                    code: `
# PROMPT 1: Create base algorithm interface
"Create a BaseMAAlgorithm abstract class for SMAC experiments..."

# PROMPT 2: Implement AMAL core logic
"Implement AMAL agent class inheriting from BaseMAAlgorithm..."

# PROMPT 3: Implement MAPPO baseline
"Implement MAPPO baseline for SMAC following Yu et al. 2022..."

# PROMPT 4: Create SMAC wrapper
"Create SMAC environment wrapper that handles multiple agents..."

# PROMPT 5: Main training script
"Create training script that runs both AMAL and MAPPO..."
`
                }
            }
        },
        {
            id: 'metrics',
            title: 'Evaluation Metrics',
            content: {
                text: "Key metrics to be tracked during the experiments.",
                code: {
                    language: 'python',
                    code: `
metrics = {
    'win_rate': [],           # Primary metric
    'episode_return': [],     # Total reward
    'battle_won': [],         # Binary win/loss
    'dead_allies': [],        # Units lost
    'dead_enemies': [],       # Enemies killed
    'sample_efficiency': [],  # Episodes to 90% performance
    'training_time': [],      # Wall clock time
    'gpu_memory': []          # Memory usage
}
`
                }
            }
        },
        {
            id: 'quickstart',
            title: 'Quick Start Commands',
            content: {
                code: {
                    language: 'bash',
                    code: `
# Install dependencies
pip install pymarl2 torch wandb

# Run easy scenario
python run_experiment.py --algo amal --scenario 3m --episodes 1000

# Run comparison
python run_experiment.py --compare --scenarios 3m,8m,MMM --episodes 5000

# Plot results
python plot_results.py --exp_dir results/
`
                }
            }
        },
        {
            id: 'analysis',
            title: 'Success Probability Analysis',
            content: {
                cards: [
                    { title: "High Confidence", confidence: 85, details: ["Information isolation will work as designed.", "Basic functionality of both algorithms will run and train."] },
                    { title: "Medium Confidence", confidence: 60, details: ["Achieving the full 8% performance gain.", "Realizing the full 40% sample efficiency improvement."] },
                    { title: "Challenges & Mitigations", confidence: 0, details: ["SMAC complexity: Start with easy scenarios.", "Hyperparameter sensitivity: Use grid search.", "Computational cost: Use smaller networks initially."] },
                ],
                text: "Realistic expectations are to get both algorithms running in Week 1, achieve competitive performance on easy scenarios in Week 2, and tune for harder scenarios in Week 3."
            }
        }
    ]
};
