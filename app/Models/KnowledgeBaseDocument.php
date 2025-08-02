<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\KnowledgeBaseDocument
 *
 * @property int $id
 * @property int $chatbot_config_id
 * @property string $title
 * @property string $filename
 * @property string $file_path
 * @property string $file_type
 * @property int $file_size
 * @property string|null $content
 * @property array|null $metadata
 * @property string $status
 * @property string|null $error_message
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ChatbotConfig $chatbotConfig
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBaseDocument newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBaseDocument newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBaseDocument query()
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBaseDocument whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBaseDocument whereChatbotConfigId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBaseDocument whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBaseDocument whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBaseDocument whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBaseDocument whereFileType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBaseDocument whereFileSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBaseDocument whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBaseDocument whereMetadata($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBaseDocument whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBaseDocument whereErrorMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBaseDocument whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBaseDocument whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBaseDocument ready()

 * 
 * @mixin \Eloquent
 */
class KnowledgeBaseDocument extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'chatbot_config_id',
        'title',
        'filename',
        'file_path',
        'file_type',
        'file_size',
        'content',
        'metadata',
        'status',
        'error_message',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'metadata' => 'array',
        'file_size' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the chatbot configuration that owns the document.
     */
    public function chatbotConfig(): BelongsTo
    {
        return $this->belongsTo(ChatbotConfig::class);
    }

    /**
     * Scope a query to only include ready documents.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeReady($query)
    {
        return $query->where('status', 'ready');
    }
}