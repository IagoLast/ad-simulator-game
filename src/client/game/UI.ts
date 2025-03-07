import * as THREE from "three";
import { PlayerState, GameState } from "../../shared/types";

/**
 * UI class handling all game user interface elements
 */
export class UI {
  private teamInfo: HTMLElement | null = null;
  private gameMessageElement: HTMLElement | null = null;
  private isMobileDevice: boolean;
  
  /**
   * Initialize the UI
   */
  constructor(isMobileDevice: boolean) {
    this.isMobileDevice = isMobileDevice;
    
    // Create UI elements
    this.createTeamInfo();
    this.createGameMessage();
    
    // Set up mobile-specific UI if needed
    if (this.isMobileDevice) {
      this.setupMobileViewport();
    }
  }
  
  /**
   * Create team info display
   */
  private createTeamInfo(): void {
    const teamInfo = document.createElement("div");
    teamInfo.id = "teamInfo";
    teamInfo.style.position = "absolute";
    teamInfo.style.top = "10px";
    teamInfo.style.right = "10px";
    teamInfo.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    teamInfo.style.color = "white";
    teamInfo.style.padding = "10px";
    teamInfo.style.borderRadius = "5px";
    teamInfo.style.fontFamily = "Arial, sans-serif";
    teamInfo.style.fontSize = "14px";
    teamInfo.style.minWidth = "200px";
    teamInfo.style.zIndex = "100";
    teamInfo.style.display = "flex";
    teamInfo.style.flexDirection = "column";
    teamInfo.style.gap = "5px";
    
    const heading = document.createElement("h3");
    heading.style.margin = "0 0 10px 0";
    heading.style.textAlign = "center";
    heading.textContent = "Team Status";
    teamInfo.appendChild(heading);
    
    document.body.appendChild(teamInfo);
    this.teamInfo = teamInfo;
  }

  /**
   * Create game message display
   */
  private createGameMessage(): void {
    const gameMessage = document.createElement("div");
    gameMessage.id = "gameMessage";
    gameMessage.style.position = "absolute";
    gameMessage.style.top = "50%";
    gameMessage.style.left = "50%";
    gameMessage.style.transform = "translate(-50%, -50%)";
    gameMessage.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    gameMessage.style.color = "white";
    gameMessage.style.padding = "20px";
    gameMessage.style.borderRadius = "5px";
    gameMessage.style.fontFamily = "Arial, sans-serif";
    gameMessage.style.fontSize = "24px";
    gameMessage.style.textAlign = "center";
    gameMessage.style.zIndex = "101";
    gameMessage.style.opacity = "0";
    gameMessage.style.transition = "opacity 0.5s";
    gameMessage.style.pointerEvents = "none";
    
    document.body.appendChild(gameMessage);
    this.gameMessageElement = gameMessage;
  }
  
  /**
   * Show a message in the center of the screen
   */
  public showGameMessage(
    message: string,
    color: string = "white",
    duration: number = 3000
  ): void {
    if (!this.gameMessageElement) return;

    this.gameMessageElement.textContent = message;
    this.gameMessageElement.style.color = color;
    this.gameMessageElement.style.opacity = "1";

    // Clear any existing timeout
    const messageTimer = this.gameMessageElement.getAttribute("data-timer");
    if (messageTimer) {
      window.clearTimeout(parseInt(messageTimer));
    }

    // Set timeout to hide the message
    const timer = window.setTimeout(() => {
      if (this.gameMessageElement) {
        this.gameMessageElement.style.opacity = "0";
      }
    }, duration);

    // Store timer ID so it can be cleared if needed
    this.gameMessageElement.setAttribute("data-timer", timer.toString());
  }
  
  /**
   * Update team info display with current player counts and flag status
   */
  public updateTeamInfo(gameState: GameState, localPlayerId: string, flagCarrier: string | null): void {
    if (!this.teamInfo) return;

    // Clear previous content except heading
    while (this.teamInfo.childNodes.length > 1) {
      this.teamInfo.removeChild(this.teamInfo.lastChild!);
    }

    // Group players by team
    const team1Players: PlayerState[] = [];
    const team2Players: PlayerState[] = [];
    let localPlayerTeam = 0;

    gameState.players.forEach((player) => {
      if (player.id === localPlayerId) {
        localPlayerTeam = player.teamId;
      }
      
      if (player.teamId === 1) {
        team1Players.push(player);
      } else if (player.teamId === 2) {
        team2Players.push(player);
      }
    });

    // Create status for each team
    const createTeamStatus = (teamId: number, players: PlayerState[], isLocalTeam: boolean) => {
      const teamColor = teamId === 1 ? "#ff4d4d" : "#4d4dff";
      const teamName = teamId === 1 ? "Red" : "Blue";
      
      const teamDiv = document.createElement("div");
      teamDiv.style.marginBottom = "10px";
      teamDiv.style.border = isLocalTeam ? `2px solid ${teamColor}` : `2px solid transparent`;
      teamDiv.style.padding = '5px';
      teamDiv.style.borderRadius = "3px";
      
      const teamHeader = document.createElement("div");
      teamHeader.style.display = "flex";
      teamHeader.style.justifyContent = "space-between";
      teamHeader.style.alignItems = "center";
      teamHeader.style.marginBottom = "5px";
      
      const teamLabel = document.createElement("span");
      teamLabel.style.fontWeight = "bold";
      teamLabel.style.color = teamColor;
      teamLabel.textContent = teamName;
      
      const playerCount = document.createElement("span");
      playerCount.textContent = `${players.length} players`;
      
      teamHeader.appendChild(teamLabel);
      teamHeader.appendChild(playerCount);
      teamDiv.appendChild(teamHeader);
      
      // Add player list
      const playerList = document.createElement("div");
      playerList.style.fontSize = "12px";
      playerList.style.maxHeight = "100px";
      playerList.style.overflowY = "auto";
      
      players.forEach(player => {
        const playerItem = document.createElement("div");
        playerItem.style.display = "flex";
        playerItem.style.justifyContent = "space-between";
        playerItem.style.padding = "2px 0";
        playerItem.style.opacity = player.id ? "0.5" : "1";
        
        const nameSpan = document.createElement("span");
        nameSpan.textContent =  player.id.substring(0, 6);
        if (player.id === localPlayerId) {
          nameSpan.style.fontWeight = "bold";
          nameSpan.textContent += " (You)";
        }
        
        const statusSpan = document.createElement("span");
        if (player.hasFlag) {
          statusSpan.textContent = "🚩";
          statusSpan.title = "Has flag";
        } else if (player.isDead) {
          statusSpan.textContent = "☠️";
          statusSpan.title = "Dead";
        } else {
          statusSpan.textContent = "❤️".repeat(player.health);
          statusSpan.title = `Health: ${player.health}`;
        }
        
        playerItem.appendChild(nameSpan);
        playerItem.appendChild(statusSpan);
        playerList.appendChild(playerItem);
      });
      
      teamDiv.appendChild(playerList);
      return teamDiv;
    };

    // Add team sections to team info
    this.teamInfo.appendChild(createTeamStatus(1, team1Players, localPlayerTeam === 1));
    this.teamInfo.appendChild(createTeamStatus(2, team2Players, localPlayerTeam === 2));

    // Add flag status
    const flagStatus = document.createElement("div");
    flagStatus.style.marginTop = "10px";
    flagStatus.style.textAlign = "center";
    flagStatus.style.fontStyle = "italic";
    
    if (flagCarrier) {
      const carrier = gameState.players.find(p => p.id === flagCarrier);
      const carrierName = carrier ? carrier.id : "Unknown";
      const carrierTeam = carrier ? (carrier.teamId === 1 ? "Red" : "Blue") : "Unknown";
      
      flagStatus.textContent = `${carrierName.substring(0, 6)} has the flag!`;
      flagStatus.style.color = carrier && carrier.teamId === 1 ? "#ff4d4d" : "#4d4dff";
    } else {
      flagStatus.textContent = "Flag is available!";
      flagStatus.style.color = "#ffcc00";
    }
    
    this.teamInfo.appendChild(flagStatus);
  }
  
  /**
   * Set up viewport meta tag for mobile devices
   */
  private setupMobileViewport(): void {
    // Check if viewport meta tag exists
    let viewport = document.querySelector('meta[name="viewport"]');
    
    // Create it if it doesn't exist
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    
    // Set appropriate content for mobile gaming
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
  }
} 