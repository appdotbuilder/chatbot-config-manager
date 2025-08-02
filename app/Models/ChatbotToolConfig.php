<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ChatbotToolConfig
 *
 * @property int $id
 * @property int $chatbot_config_id
 * @property int $chatbot_tool_id
 * @property bool $is_enabled
 * @property array|null $configuration
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ChatbotConfig $chatbotConfig
 * @property-read \App\Models\ChatbotTool $chatbotTool
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotToolConfig newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotToolConfig newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotToolConfig query()
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotToolConfig whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotToolConfig whereChatbotConfigId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotToolConfig whereChatbotToolId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotToolConfig whereIsEnabled($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotToolConfig whereConfiguration($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotToolConfig whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotToolConfig whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotToolConfig enabled()

 * 
 * @mixin \Eloquent
 */
class ChatbotToolConfig extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'chatbot_config_id',
        'chatbot_tool_id',
        'is_enabled',
        'configuration',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_enabled' => 'boolean',
        'configuration' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the chatbot configuration that owns this tool config.
     */
    public function chatbotConfig(): BelongsTo
    {
        return $this->belongsTo(ChatbotConfig::class);
    }

    /**
     * Get the chatbot tool for this configuration.
     */
    public function chatbotTool(): BelongsTo
    {
        return $this->belongsTo(ChatbotTool::class);
    }

    /**
     * Scope a query to only include enabled tool configs.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeEnabled($query)
    {
        return $query->where('is_enabled', true);
    }
}