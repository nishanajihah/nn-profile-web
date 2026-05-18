<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let track: any;
    export let index: number;
    export let isPlaying: boolean = false;

    const dispatch = createEventDispatcher();

    function formatDuration(ms: number) {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
    }

    function togglePlay() {
        dispatch('play', track);
    }
</script>

<div class="track-card {isPlaying ? 'active' : ''}">
    <div class="track-number">{index + 1}</div>
    
    <div class="track-info">
        <h3 class="track-name">{track.name}</h3>
        <p class="track-artist">{track.artists} &bull; {track.album}</p>
    </div>

    <div class="track-duration">
        {formatDuration(track.durationMs)}
    </div>

    <button class="play-btn" on:click={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
        {#if isPlaying}
            <div class="bars">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
        {:else}
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
            </svg>
        {/if}
    </button>
</div>

<style lang="scss">
    .track-card {
        display: flex;
        align-items: center;
        padding: 1rem 1.5rem;
        margin-bottom: 1rem;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        cursor: pointer;
        
        /* Neumorphic subtle shadows for dark mode */
        box-shadow: 
            5px 5px 15px rgba(0, 0, 0, 0.5),
            -5px -5px 15px rgba(255, 255, 255, 0.02);

        &:hover {
            background: rgba(255, 255, 255, 0.05);
            transform: translateY(-2px);
            border-color: rgba(255, 222, 33, 0.3); // Yellow tint
        }

        &.active {
            background: rgba(255, 222, 33, 0.1);
            border-color: rgba(255, 222, 33, 0.5);
            
            .track-name {
                color: #ffde21;
            }
        }
    }

    .track-number {
        font-size: 1.2rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.3);
        width: 40px;
        font-family: 'Anta', sans-serif;
    }

    .track-info {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 1rem;
        overflow: hidden;
    }

    .track-name {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 500;
        color: #ffffff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: color 0.3s ease;
    }

    .track-artist {
        margin: 0;
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.6);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .track-duration {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.5);
        margin-right: 1.5rem;
        font-family: monospace;
    }

    .play-btn {
        background: rgba(255, 255, 255, 0.05);
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #ffde21;
        transition: all 0.3s ease;
        
        /* Neumorphic button */
        box-shadow: 
            3px 3px 8px rgba(0, 0, 0, 0.6),
            -3px -3px 8px rgba(255, 255, 255, 0.05);

        &:hover {
            background: rgba(255, 222, 33, 0.1);
            transform: scale(1.05);
        }

        &:active {
            box-shadow: 
                inset 3px 3px 8px rgba(0, 0, 0, 0.6),
                inset -3px -3px 8px rgba(255, 255, 255, 0.05);
        }

        svg {
            width: 20px;
            height: 20px;
            margin-left: 3px; // Optical alignment
        }
    }

    .bars {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        height: 16px;
        gap: 3px;

        .bar {
            width: 3px;
            background-color: #ffde21;
            border-radius: 2px;
            animation: bounce 1s infinite alternate;

            &:nth-child(1) { height: 8px; animation-delay: 0s; }
            &:nth-child(2) { height: 16px; animation-delay: 0.3s; }
            &:nth-child(3) { height: 12px; animation-delay: 0.6s; }
        }
    }

    @keyframes bounce {
        from { transform: scaleY(0.5); }
        to { transform: scaleY(1); }
    }
    
    @media (max-width: 600px) {
        .track-duration {
            display: none;
        }
    }
</style>
