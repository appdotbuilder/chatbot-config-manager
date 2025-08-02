<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ChatbotConfig
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string|null $avatar_url
 * @property string|null $greeting_message
 * @property string|null $fallback_message
 * @property array|null $personality_traits
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\KnowledgeBaseDocument> $knowledgeBaseDocuments
 * @property-read int|null $knowledge_base_documents_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ChatbotToolConfig> $toolConfigs
 * @property-read int|null $tool_configs_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\IntegrationSetting> $integrationSettings
 * @property-read int|null $integration_settings_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotConfig newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotConfig newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotConfig query()
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotConfig whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotConfig whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotConfig whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotConfig whereAvatarUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotConfig whereGreetingMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotConfig whereFallbackMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotConfig wherePersonalityTraits($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotConfig whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotConfig whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotConfig whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotConfig active()
 * @method static \Database\Factories\ChatbotConfigFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ChatbotConfig extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'avatar_url',
        'greeting_message',
        'fallback_message',
        'personality_traits',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'personality_traits' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the knowledge base documents for the chatbot.
     */
    public function knowledgeBaseDocuments(): HasMany
    {
        return $this->hasMany(KnowledgeBaseDocument::class);
    }

    /**
     * Get the tool configurations for the chatbot.
     */
    public function toolConfigs(): HasMany
    {
        return $this->hasMany(ChatbotToolConfig::class);
    }

    /**
     * Get the integration settings for the chatbot.
     */
    public function integrationSettings(): HasMany
    {
        return $this->hasMany(IntegrationSetting::class);
    }

    /**
     * Scope a query to only include active chatbots.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}