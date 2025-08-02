<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\Attribute;

/**
 * App\Models\IntegrationSetting
 *
 * @property int $id
 * @property int $chatbot_config_id
 * @property string $service_name
 * @property string $display_name
 * @property bool $is_enabled
 * @property array|null $credentials
 * @property array|null $settings
 * @property \Illuminate\Support\Carbon|null $last_sync_at
 * @property string $status
 * @property string|null $error_message
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ChatbotConfig $chatbotConfig
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|IntegrationSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|IntegrationSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|IntegrationSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|IntegrationSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IntegrationSetting whereChatbotConfigId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IntegrationSetting whereServiceName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IntegrationSetting whereDisplayName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IntegrationSetting whereIsEnabled($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IntegrationSetting whereCredentials($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IntegrationSetting whereSettings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IntegrationSetting whereLastSyncAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IntegrationSetting whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IntegrationSetting whereErrorMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IntegrationSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IntegrationSetting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IntegrationSetting connected()
 * @method static \Illuminate\Database\Eloquent\Builder|IntegrationSetting enabled()

 * 
 * @mixin \Eloquent
 */
class IntegrationSetting extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'chatbot_config_id',
        'service_name',
        'display_name',
        'is_enabled',
        'credentials',
        'settings',
        'last_sync_at',
        'status',
        'error_message',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_enabled' => 'boolean',
        'credentials' => 'encrypted:array',
        'settings' => 'array',
        'last_sync_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the chatbot configuration that owns this integration setting.
     */
    public function chatbotConfig(): BelongsTo
    {
        return $this->belongsTo(ChatbotConfig::class);
    }

    /**
     * Scope a query to only include connected integrations.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeConnected($query)
    {
        return $query->where('status', 'connected');
    }

    /**
     * Scope a query to only include enabled integrations.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeEnabled($query)
    {
        return $query->where('is_enabled', true);
    }
}