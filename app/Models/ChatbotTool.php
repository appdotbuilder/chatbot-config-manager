<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ChatbotTool
 *
 * @property int $id
 * @property string $name
 * @property string $display_name
 * @property string $description
 * @property string|null $icon
 * @property string $category
 * @property array|null $required_config
 * @property array|null $optional_config
 * @property bool $is_available
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ChatbotToolConfig> $toolConfigs
 * @property-read int|null $tool_configs_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotTool newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotTool newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotTool query()
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotTool whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotTool whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotTool whereDisplayName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotTool whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotTool whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotTool whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotTool whereRequiredConfig($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotTool whereOptionalConfig($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotTool whereIsAvailable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotTool whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotTool whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatbotTool available()
 * @method static \Database\Factories\ChatbotToolFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ChatbotTool extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'display_name',
        'description',
        'icon',
        'category',
        'required_config',
        'optional_config',
        'is_available',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'required_config' => 'array',
        'optional_config' => 'array',
        'is_available' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the tool configurations for this tool.
     */
    public function toolConfigs(): HasMany
    {
        return $this->hasMany(ChatbotToolConfig::class);
    }

    /**
     * Scope a query to only include available tools.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true);
    }
}